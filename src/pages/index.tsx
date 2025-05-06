import type { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';
import { getSortedPostsData } from '@/lib/posts';
import type { PostData } from '@/lib/posts';
import ArticleList from '@/components/features/Article/ArticleList';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
};

export default function Home({ posts }: Props) {
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
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsResult = getSortedPostsData();

  if (postsResult.isOk()) {
    return {
      props: {
        posts: postsResult.value,
      },
    };
  }

  console.error('Error fetching posts:', postsResult.error);
  return {
    notFound: true,
  };
};
