import { GetStaticProps } from 'next';
import React from 'react';
import Link from '@/components/common/Link';
import BaseLayout from '@/components/layout/BaseLayout';
import Heading from '@/components/common/Heading';
import { getAllAuthorIds, getSortedPostsData, PostData } from '@/lib/posts';

type AuthorInfo = {
  name: string;
  id: string;
  postCount: number;
};

type AuthorsPageProps = {
  authors: AuthorInfo[];
};

export default function AuthorsPage({ authors }: AuthorsPageProps) {
  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <Heading level={1} className="mb-8">
          著者一覧
        </Heading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <Heading level={2} className="text-xl mb-2 border-none pb-0">
                <Link href={`/author/${author.id}`}>{author.name}</Link>
              </Heading>
              <p className="text-sm text-neutral-500">記事数: {author.postCount}</p>
            </div>
          ))}
        </div>

        {authors.length === 0 && <p className="text-center p-6">著者が見つかりません。</p>}
      </div>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps<AuthorsPageProps> = async () => {
  // 全著者IDを取得
  const authorIdsResult = getAllAuthorIds();

  if (authorIdsResult.isErr()) {
    console.error('Error fetching author IDs:', authorIdsResult.error);
    return {
      props: {
        authors: [],
      },
    };
  }

  // 記事一覧を取得
  const postsResult = getSortedPostsData();

  if (postsResult.isErr()) {
    console.error('Error fetching posts:', postsResult.error);
    return {
      props: {
        authors: [],
      },
    };
  }

  const posts = postsResult.value;

  // 著者ごとの記事数をカウント
  const authorCounts: Record<string, number> = {};
  const authorNames: Record<string, string> = {};

  // for...ofループを使用
  for (const post of posts) {
    if (post.author) {
      const authorId = post.author.toLowerCase().replace(/\s+/g, '-');
      authorCounts[authorId] = (authorCounts[authorId] || 0) + 1;
      authorNames[authorId] = post.author;
    }
  }

  // 著者情報の配列を作成
  const authors: AuthorInfo[] = Object.keys(authorCounts).map((authorId) => ({
    id: authorId,
    name: authorNames[authorId],
    postCount: authorCounts[authorId],
  }));

  // 記事数の多い順にソート
  authors.sort((a, b) => b.postCount - a.postCount);

  return {
    props: {
      authors,
    },
  };
};
