import type { GetStaticProps, GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/posts";
import type { PostData } from "@/lib/posts";

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
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
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
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getPostData(params?.id as string);
  return {
    props: {
      post,
    },
  };
};
