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
