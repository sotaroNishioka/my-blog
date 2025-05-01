import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import Layout from '@/components/Layout';
import { getAllPostIds, getPostData } from '@/lib/posts';
import type { PostData, PostsError } from '@/lib/posts';

type Props = {
  post: PostData;
};

export default function Post({ post }: Props) {
  return (
    <Layout>
      <article className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-8">
          <div className="text-gray-500 mb-4">{post.date}</div>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          className="mt-8"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = getAllPostIds();

  const paths = result.isOk() ? result.value : [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const result = await getPostData(context.params.id);

  if (result.isOk()) {
    return {
      props: {
        post: result.value,
      },
    };
  }

  console.error('Failed to get post data:', result.error);
  return {
    notFound: true,
  };
};
