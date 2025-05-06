import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ArticleList from '@/components/features/Article/ArticleList';
import Heading from '@/components/common/Heading';
import { getAllTagIds, getPaginatedPostsByTagData, PostData } from '@/lib/posts';
import { Pagination } from '@/components/common/Pagination';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';

interface TagParams extends ParsedUrlQuery {
  tag: string;
}

type TagPageProps = {
  tag: string;
  posts: Omit<PostData, 'contentHtml'>[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

const POSTS_PER_PAGE = 5;

export default function TagPage({ tag, posts, currentPage, totalPages, totalPosts }: TagPageProps) {
  const router = useRouter();
  const decodedTag = decodeURIComponent(tag);

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(`/tags/${tag}`);
    } else {
      router.push(`/tags/${tag}/page/${page}`);
    }
  };

  if (totalPosts === 0) {
    return (
      <Layout siteTitle={`タグ: ${decodedTag} - My Blog`}>
        <div className="container mx-auto px-4 py-8">
          <Heading level={1} className="mb-4">
            タグ: {decodedTag}
          </Heading>
          <Paragraph>このタグの記事はまだありません。</Paragraph>
          <Paragraph className="mt-4">
            <Link href="/tags">他のタグを探す</Link>
          </Paragraph>
        </div>
      </Layout>
    );
  }

  return (
    <Layout siteTitle={`タグ: ${decodedTag}${totalPages > 1 ? ` (${currentPage}/${totalPages})` : ''} - My Blog`}>
      <div className="container mx-auto px-4 py-8">
        <Heading level={1} className="mb-8">
          タグ: {decodedTag}
          {totalPages > 1 && (
            <span className="text-base font-normal text-neutral-500 ml-2">
              (Page {currentPage}/{totalPages})
            </span>
          )}
        </Heading>

        <ArticleList articles={posts} />

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
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
  const pageResult = getPaginatedPostsByTagData(tag, 1, POSTS_PER_PAGE);

  if (pageResult.isErr()) {
    console.error(`Error fetching posts for tag ${tag}, page 1:`, pageResult.error);
    return {
      notFound: true,
    };
  }

  const { posts, totalPages, totalPosts, currentPage } = pageResult.value;

  if (posts.length === 0 && totalPosts > 0 && currentPage === 1) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      posts,
      currentPage,
      totalPages,
      totalPosts,
    },
  };
};
