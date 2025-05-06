import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import Layout from '@/components/layout/Layout';
import ArticleList from '@/components/features/Article/ArticleList';
import Heading from '@/components/common/Heading';
import { getAllTagIds, getPostsByTag, PostData } from '@/lib/posts';

interface TagParams extends ParsedUrlQuery {
  tag: string;
}

type TagPageProps = {
  tag: string;
  posts: Omit<PostData, 'contentHtml'>[];
};

export default function TagPage({ tag, posts }: TagPageProps) {
  const decodedTag = decodeURIComponent(tag);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Heading level={1} className="mb-8">
          タグ: {decodedTag}
        </Heading>

        <ArticleList articles={posts} />
      </div>
    </Layout>
  );
}

// 動的ルーティングのためのパスを生成
export const getStaticPaths: GetStaticPaths<TagParams> = async () => {
  const tagIdsResult = getAllTagIds();

  if (tagIdsResult.isErr()) {
    console.error('Error fetching tag IDs:', tagIdsResult.error);
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths: tagIdsResult.value,
    fallback: false, // 存在しないパスは404に
  };
};

// 各タグページのデータを取得
export const getStaticProps: GetStaticProps<TagPageProps, TagParams> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { tag } = params;
  const postsResult = getPostsByTag(tag);

  if (postsResult.isErr()) {
    console.error(`Error fetching posts for tag ${tag}:`, postsResult.error);
    return {
      notFound: true,
    };
  }

  const posts = postsResult.value;

  return {
    props: {
      tag, // URLエンコードされたままのタグを渡す
      posts,
    },
  };
};
