import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = join(process.cwd(), 'posts');

export type PostData = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml: string;
};

export function getSortedPostsData(): Omit<PostData, 'contentHtml'>[] {
  // posts ディレクトリからファイル名を取得
  const fileNames = readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName: string) => {
    // ファイル名から id を取得 (ファイル名から .md を除いたもの)
    const id = fileName.replace(/\.md$/, '');

    // Markdown ファイルを文字列として読み取る
    const fullPath = join(postsDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');

    // gray-matter を使用してメタデータを解析
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags || [],
    };
  });

  // 投稿を日付でソート
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getAllPostIds() {
  const fileNames = readdirSync(postsDirectory);
  return fileNames.map((fileName: string) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');

  // メタデータを解析
  const matterResult = matter(fileContents);

  // Markdown を HTML に変換 (marked を使用)
  const contentHtml = await marked(matterResult.content);

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags || [],
  };
}
