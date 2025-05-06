import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '@/components/layout/Layout';
import ArticleList from '@/components/features/Article/ArticleList';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';
import {
  getAllTagIds,
  getPaginatedPostsByTagData,
  getPostsByTag, // getStaticPathsで総ページ数計算のために一時的に使用
  PostData,
} from '@/lib/posts';
import { Pagination } from '@/components/common/Pagination';

interface TagPageParams extends ParsedUrlQuery {
  tag: string;
  pageNumber: string;
}

type TagPaginatedPageProps = {
  tag: string; // URLエンコードされたタグ名
  posts: Omit<PostData, 'contentHtml'>[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

const POSTS_PER_PAGE = 5;

export default function TagPaginatedPage({ tag, posts, currentPage, totalPages, totalPosts }: TagPaginatedPageProps) {
  const router = useRouter();
  const decodedTag = decodeURIComponent(tag);

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(`/tags/${tag}`);
    } else {
      router.push(`/tags/${tag}/page/${page}`);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <Layout siteTitle={`タグ: ${decodedTag} - My Blog`}>
        <div className="container mx-auto px-4 py-8">
          <Heading level={1} className="mb-4">
            タグ: {decodedTag} (Page {currentPage})
          </Heading>
          <Paragraph>指定されたページの記事は見つかりませんでした。</Paragraph>
          <Paragraph className="mt-4">
            <Link href={`/tags/${tag}`}>このタグの最初のページへ</Link>
          </Paragraph>
        </div>
      </Layout>
    );
  }

  return (
    <Layout siteTitle={`タグ: ${decodedTag} (${currentPage}/${totalPages}) - My Blog`}>
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

export const getStaticPaths: GetStaticPaths<TagPageParams> = async () => {
  const tagIdsResult = getAllTagIds();
  if (tagIdsResult.isErr()) {
    console.error('Error fetching tag IDs for paginated paths:', tagIdsResult.error);
    return { paths: [], fallback: 'blocking' };
  }

  const paths: Array<{ params: TagPageParams }> = [];

  for (const tagIdObj of tagIdsResult.value) {
    const tag = tagIdObj.params.tag; // URLエンコードされたタグ
    // このタグの総記事数を取得して総ページ数を計算
    const postsForTagResult = getPostsByTag(tag);
    if (postsForTagResult.isOk()) {
      const totalPostsForTag = postsForTagResult.value.length;
      const totalPagesForTag = Math.ceil(totalPostsForTag / POSTS_PER_PAGE);

      // 2ページ目から totalPagesForTag までのパスを生成
      for (let i = 2; i <= totalPagesForTag; i++) {
        paths.push({ params: { tag, pageNumber: i.toString() } });
      }
    }
  }

  return {
    paths,
    fallback: false, // 存在しないページは404
  };
};

export const getStaticProps: GetStaticProps<TagPaginatedPageProps, TagPageParams> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const { tag, pageNumber: pageNumberString } = params;
  const pageNumber = parseInt(pageNumberString, 10);

  if (Number.isNaN(pageNumber) || pageNumber <= 1) {
    // このパスは2ページ目以降を想定。1ページ目や不正な値は notFound。
    return { notFound: true };
  }

  const pageResult = getPaginatedPostsByTagData(tag, pageNumber, POSTS_PER_PAGE);

  if (pageResult.isErr()) {
    console.error(`Error fetching posts for tag ${tag}, page ${pageNumber}:`, pageResult.error);
    return { notFound: true };
  }

  const { posts, totalPages, totalPosts, currentPage } = pageResult.value;

  if (posts.length === 0 && totalPosts > 0 && pageNumber > 1) {
    // 要求されたページに記事がないが、ブログ全体には記事があり、1ページ目ではない場合
    return { notFound: true };
  }
  if (pageNumber > totalPages && totalPages > 0) {
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
