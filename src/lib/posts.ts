import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Result, ok, err } from 'neverthrow';

// エラータイプを定義
export type PostsError =
  | { type: 'DirectoryNotFound'; path: string; error?: unknown }
  | { type: 'FileNotFound'; path: string; error?: unknown }
  | { type: 'ReadFileError'; path: string; error?: unknown }
  | { type: 'MarkdownParseError'; path: string; error?: unknown };

const postsDirectory = join(process.cwd(), 'posts');

export type PostData = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  author?: string;
  contentHtml: string;
};

export function getSortedPostsData(): Result<Omit<PostData, 'contentHtml'>[], PostsError> {
  try {
    // posts ディレクトリからファイル名を取得
    const fileNames = readdirSync(postsDirectory);

    const postsDataResults = fileNames.map((fileName: string): Result<Omit<PostData, 'contentHtml'>, PostsError> => {
      // ファイル名から id を取得 (ファイル名から .md を除いたもの)
      const id = fileName.replace(/\.md$/, '');
      const fullPath = join(postsDirectory, fileName);

      try {
        // Markdown ファイルを文字列として読み取る
        const fileContents = readFileSync(fullPath, 'utf8');

        // gray-matter を使用してメタデータを解析
        const matterResult = matter(fileContents);

        // 日付が Date オブジェクトの場合、YYYY-MM-DD 形式の文字列に変換
        const dateString =
          matterResult.data.date instanceof Date
            ? matterResult.data.date.toISOString().split('T')[0]
            : matterResult.data.date;

        return ok({
          id,
          title: matterResult.data.title,
          date: dateString, // 文字列に変換した日付を使用
          tags: matterResult.data.tags || [],
          author: matterResult.data.author || undefined,
        });
      } catch (e) {
        // ファイル読み込みやパースのエラー
        // Node.jsのfsエラーか、一般的なエラーかを判定
        if (typeof e === 'object' && e !== null && 'code' in e && e.code === 'ENOENT') {
          return err({ type: 'FileNotFound', path: fullPath, error: e });
        }
        return err({ type: 'ReadFileError', path: fullPath, error: e });
      }
    });

    // エラーがあれば最初のものを返す
    const firstErrorResult = postsDataResults.find((r) => r.isErr());
    if (firstErrorResult?.isErr()) {
      // オプショナルチェイニングを使用
      return err(firstErrorResult.error);
    }

    // すべて成功ならデータを抽出してソート
    const allPostsData = postsDataResults
      .filter((r): r is import('neverthrow').Ok<Omit<PostData, 'contentHtml'>, PostsError> => r.isOk())
      .map((r) => r.value);

    // 投稿を日付でソート
    return ok(
      allPostsData.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        return -1;
      })
    );
  } catch (e) {
    // ディレクトリ読み込みエラー
    return err({ type: 'DirectoryNotFound', path: postsDirectory, error: e });
  }
}

export function getAllPostIds(): Result<{ params: { id: string } }[], PostsError> {
  try {
    const fileNames = readdirSync(postsDirectory);
    return ok(
      fileNames.map((fileName: string) => {
        return {
          params: {
            id: fileName.replace(/\.md$/, ''),
          },
        };
      })
    );
  } catch (e) {
    return err({ type: 'DirectoryNotFound', path: postsDirectory, error: e });
  }
}

export async function getPostData(id: string): Promise<Result<PostData, PostsError>> {
  const fullPath = join(postsDirectory, `${id}.md`);
  try {
    const fileContents = readFileSync(fullPath, 'utf8');

    try {
      // メタデータを解析
      const matterResult = matter(fileContents);

      try {
        // Markdown を HTML に変換 (marked を使用)
        const contentHtml = await marked(matterResult.content);

        return ok({
          id,
          contentHtml,
          title: matterResult.data.title,
          date: matterResult.data.date,
          tags: matterResult.data.tags || [],
          author: matterResult.data.author || undefined,
        });
      } catch (e) {
        return err({ type: 'MarkdownParseError', path: fullPath, error: e });
      }
    } catch (e) {
      // gray-matterのエラーもここでキャッチされる可能性があるが、
      // 区別が難しい場合は ReadFileError に寄せるか、より詳細なエラー型を定義する
      return err({ type: 'ReadFileError', path: fullPath, error: e }); // または MarkdownParseError?
    }
  } catch (e) {
    // ファイル読み込みエラー
    if (typeof e === 'object' && e !== null && 'code' in e && e.code === 'ENOENT') {
      return err({ type: 'FileNotFound', path: fullPath, error: e });
    }
    return err({ type: 'ReadFileError', path: fullPath, error: e });
  }
}

// 全著者のIDリストを取得
export function getAllAuthorIds(): Result<{ params: { authorId: string } }[], PostsError> {
  const postsResult = getSortedPostsData();

  if (postsResult.isErr()) {
    return err(postsResult.error);
  }

  const posts = postsResult.value;

  // 著者情報がある記事から著者を抽出し、重複を除去
  const authors = Array.from(
    new Set(
      posts
        .filter((post) => post.author) // author が存在する記事だけ抽出
        .map((post) => post.author as string) // 型アサーションを使用（filterですでにnullでないことを確認済み）
    )
  );

  // 著者IDのパラメータオブジェクトを作成
  return ok(
    authors.map((author) => ({
      params: {
        authorId: encodeURIComponent(author.toLowerCase().replace(/\s+/g, '-')),
      },
    }))
  );
}

// 著者IDから著者名を取得
export function getAuthorNameFromId(authorId: string): string {
  // authorId はURL対応のため小文字ハイフン区切り化されているので
  // 元の形式（スペース入り、大文字小文字の組み合わせ）に戻す処理が必要な場合は
  // ここで行います。現在はそのまま表示します。
  return decodeURIComponent(authorId).replace(/-/g, ' ');
}

// 著者別の記事を取得
export function getPostsByAuthor(authorId: string): Result<Omit<PostData, 'contentHtml'>[], PostsError> {
  const postsResult = getSortedPostsData();

  if (postsResult.isErr()) {
    return err(postsResult.error);
  }

  const posts = postsResult.value;
  const authorName = getAuthorNameFromId(authorId);

  // 著者名が一致する記事だけをフィルタリング
  const authorPosts = posts.filter((post) => {
    return post.author && post.author.toLowerCase() === authorName.toLowerCase();
  });

  return ok(authorPosts);
}

// 全タグリストとその記事数を取得
export function getAllTagsWithCount(): Result<{ [tag: string]: number }, PostsError> {
  const postsResult = getSortedPostsData();

  if (postsResult.isErr()) {
    return err(postsResult.error);
  }

  const posts = postsResult.value;
  const tagCounts: { [tag: string]: number } = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  return ok(tagCounts);
}

// 全タグのIDリストを取得 (getStaticPaths用)
export function getAllTagIds(): Result<{ params: { tag: string } }[], PostsError> {
  const tagsResult = getAllTagsWithCount();

  if (tagsResult.isErr()) {
    return err(tagsResult.error);
  }

  const tags = Object.keys(tagsResult.value);

  return ok(
    tags.map((tag) => ({
      params: {
        // タグ名をURLパラメータ用にエンコード
        tag: encodeURIComponent(tag),
      },
    }))
  );
}

// 特定のタグを持つ記事を取得
export function getPostsByTag(tag: string): Result<Omit<PostData, 'contentHtml'>[], PostsError> {
  const postsResult = getSortedPostsData();

  if (postsResult.isErr()) {
    return err(postsResult.error);
  }

  const posts = postsResult.value;
  // URLデコードされたタグ名でフィルタリング
  const decodedTag = decodeURIComponent(tag);

  const taggedPosts = posts.filter((post) => post.tags.includes(decodedTag));

  return ok(taggedPosts);
}
