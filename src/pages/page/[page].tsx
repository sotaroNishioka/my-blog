import type { GetStaticProps, GetStaticPaths } from 'next'; // GetStaticPaths をインポート
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';
import { getPaginatedPostsData, getSortedPostsData } from '@/lib/posts'; // getSortedPostsData も一時的に利用（getStaticPathsのため）
import type { PostData } from '@/lib/posts';
import { Pagination } from '@/components/common/Pagination';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

const POSTS_PER_PAGE = 5;

export default function PageNumberPage({ posts, currentPage, totalPages, totalPosts }: Props) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push('/');
    } else {
      router.push(`/page/${page}`);
    }
  };

  if (!posts || posts.length === 0) {
    // currentPage が不正な場合（大きすぎる場合など）postsが空になることがある
    return (
      <Layout siteTitle="My Blog">
        <Heading level={1}>Blog Posts</Heading>
        <Paragraph>指定されたページの記事は見つかりませんでした。</Paragraph>
        <Paragraph>
          <Link href="/">最初のページへ</Link>
        </Paragraph>
      </Layout>
    );
  }

  return (
    <Layout siteTitle={`My Blog - Page ${currentPage}`}>
      <div className="space-y-8">
        <Heading level={1}>
          Blog Posts <span className="text-base font-normal text-neutral-500">(Page {currentPage})</span>
        </Heading>
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.id}>
              <Heading level={2} className="text-xl mb-1 border-none pb-0">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </Heading>
              <Paragraph className="text-sm text-neutral-500 mb-0">
                {post.date}
                {post.tags && post.tags.length > 0 && <span className="ml-4">Tags: {post.tags.join(', ')}</span>}
              </Paragraph>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全記事を取得して総ページ数を計算
  const postsResult = getSortedPostsData(); // ここではページ分割されていない全記事リストを取得
  if (postsResult.isErr()) {
    console.error('Error fetching posts for paths:', postsResult.error);
    return { paths: [], fallback: 'blocking' }; // エラー時は fallback を blocking にして ISR を試みるか、false で 404
  }
  const totalPosts = postsResult.value.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: (i + 2).toString() }, // 2ページ目からtotalPagesまで
  }));

  return {
    paths,
    fallback: false, // 存在しないページは404
  };
};

export const getStaticProps: GetStaticProps<Props, { page: string }> = async (context) => {
  const pageString = context.params?.page ?? '1';
  const page = parseInt(pageString, 10);

  if (Number.isNaN(page) || page <= 1) {
    // 1ページ目や不正なページは / にリダイレクトまたは404を返す想定だが、ここではビルド時にエラーとする
    // このパス (/page/[page]) は2ページ目以降を想定しているため、pageが1以下の場合はnotFoundを返す。
    // 本来は index.tsx が1ページ目を処理する。
    return { notFound: true };
  }

  const postsResult = getPaginatedPostsData(page, POSTS_PER_PAGE);

  if (postsResult.isOk()) {
    const { posts, totalPages, totalPosts } = postsResult.value;

    if (page > totalPages && totalPages > 0) {
      // 要求されたページが実際の総ページ数を超えている場合 (記事が削除されたなどで総ページ数が減った場合など)
      return { notFound: true };
    }
    if (posts.length === 0 && totalPosts > 0 && page > 1) {
      // 要求されたページに記事が存在しないが、ブログ全体には記事が存在し、かつ1ページ目ではない場合
      // (例: 5件/ページで総記事6件の時、page=3をリクエストされた場合など)
      // getPaginatedPostsData内でcurrentPageがtotalPagesに調整されるので、ここに来るのは稀かもしれないが念のため
      return { notFound: true };
    }

    return {
      props: {
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
      },
    };
  }

  console.error(`Error fetching posts for page ${page}:`, postsResult.error);
  return {
    notFound: true,
  };
};
