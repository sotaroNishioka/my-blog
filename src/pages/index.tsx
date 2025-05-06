import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';
import { getPaginatedPostsData } from '@/lib/posts';
import type { PostData } from '@/lib/posts';
import { Pagination } from '@/components/common/Pagination';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

const POSTS_PER_PAGE = 5;

export default function Home({ posts, currentPage, totalPages, totalPosts }: Props) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push('/');
    } else {
      router.push(`/page/${page}`);
    }
  };

  if (totalPosts === 0) {
    return (
      <Layout siteTitle="My Blog">
        <Heading level={1}>Blog Posts</Heading>
        <Paragraph>まだ投稿がありません。</Paragraph>
      </Layout>
    );
  }

  return (
    <Layout siteTitle="My Blog">
      <div className="space-y-8">
        <Heading level={1}>Blog Posts</Heading>
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsResult = getPaginatedPostsData(1, POSTS_PER_PAGE);

  if (postsResult.isOk()) {
    const { posts, totalPages, totalPosts } = postsResult.value;
    return {
      props: {
        posts,
        currentPage: 1,
        totalPages,
        totalPosts,
      },
    };
  }

  console.error('Error fetching posts for page 1:', postsResult.error);
  return {
    notFound: true,
  };
};
