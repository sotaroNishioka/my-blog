import type { GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from '@/components/common/Link';
import { getSortedPostsData } from '@/lib/posts';
import type { PostData } from '@/lib/posts';
import Button from '@/components/common/Button';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
};

const INITIAL_POST_COUNT = 5;
const LOAD_MORE_COUNT = 5;

export default function Home({ posts: allPosts }: Props) {
  const [displayedPosts, setDisplayedPosts] = useState<Omit<PostData, 'contentHtml'>[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(false);

  useEffect(() => {
    setDisplayedPosts(allPosts.slice(0, INITIAL_POST_COUNT));
    setCanLoadMore(allPosts.length > INITIAL_POST_COUNT);
  }, [allPosts]);

  const handleLoadMore = () => {
    const currentLength = displayedPosts.length;
    const morePosts = allPosts.slice(currentLength, currentLength + LOAD_MORE_COUNT);
    setDisplayedPosts([...displayedPosts, ...morePosts]);
    setCanLoadMore(allPosts.length > currentLength + LOAD_MORE_COUNT);
  };

  return (
    <Layout siteTitle="My Blog">
      <div className="space-y-8">
        <Heading level={1}>Blog Posts</Heading>
        <div className="grid gap-8">
          {displayedPosts.map((post) => (
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
        {canLoadMore && (
          <div className="text-center mt-8">
            <Button onClick={handleLoadMore} variant="primary" className="px-6 py-3">
              もっと見る
            </Button>
          </div>
        )}
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
