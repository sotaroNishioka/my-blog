import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring'
import React from 'react';
import BaseLayout from '@/components/layout/BaseLayout'
import UserProfileHeader from '@/components/features/UserProfile/UserProfileHeader'
import TabNavigation from '@/components/features/Navigation/TabNavigation'
import ArticleList from '@/components/features/Article/ArticleList'
import { getAllAuthorIds, getAuthorNameFromId, getPostsByAuthor, PostData } from '@/lib/posts';

interface AuthorParams extends ParsedUrlQuery {
  authorId: string;
}

type AuthorPageProps = {
  authorName: string;
  posts: Omit<PostData, 'contentHtml'>[];
  authorId: string;
};

export default function AuthorPage({ authorName, posts, authorId }: AuthorPageProps) {
  // タブナビゲーション用のタブ定義
  const tabs = [
    { label: 'すべての記事', href: `/author/${authorId}` },
    // 将来的に「人気の記事」や「最新の記事」など他のタブを追加できる
  ];

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <UserProfileHeader userName={authorName} description={`${authorName}の記事一覧`} />
        
        <TabNavigation tabs={tabs} activeHref={`/author/${authorId}`} />
        
        <ArticleList articles={posts} />
      </div>
    </BaseLayout>
  );
}

// 動的ルーティングのためのパスを生成
export const getStaticPaths: GetStaticPaths<AuthorParams> = async () => {
  const authorIdsResult = getAllAuthorIds();
  
  if (authorIdsResult.isErr()) {
    console.error('Error fetching author IDs:', authorIdsResult.error);
    return {
      paths: [],
      fallback: false,
    };
  }
  
  return {
    paths: authorIdsResult.value,
    fallback: false, // 存在しないパスは404に
  };
};

// 各著者ページのデータを取得
export const getStaticProps: GetStaticProps<AuthorPageProps, AuthorParams> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { authorId } = params;
  const authorName = getAuthorNameFromId(authorId);
  const postsResult = getPostsByAuthor(authorId);
  
  if (postsResult.isErr()) {
    console.error(`Error fetching posts for author ${authorId}:`, postsResult.error);
    return {
      notFound: true,
    };
  }
  
  const posts = postsResult.value;
  
  return {
    props: {
      authorName,
      posts,
      authorId,
    },
  };
}; 