import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { getSortedPostsData } from '@/lib/posts';
import type { PostData } from '@/lib/posts';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
};

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <div className="grid gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.id} id={post.id} title={post.title} date={post.date} tags={post.tags} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsResult = getSortedPostsData();

  if (postsResult.isOk()) {
    // 成功した場合のみ Result から値を取り出して props に渡す
    return {
      props: {
        posts: postsResult.value,
      },
    };
  }

  // isOk() でなければエラーなので、ここでエラー処理
  console.error('Error fetching posts:', postsResult.error);
  return {
    notFound: true,
  };
};
