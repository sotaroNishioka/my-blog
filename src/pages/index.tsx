import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
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
            <article key={post.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Link href={`/posts/${post.id}`} className="block space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
                <div className="text-gray-500">{post.date}</div>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
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
