import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import BaseLayout from '@/components/layout/BaseLayout';
import { getAllPostIds, getPostData } from '@/lib/posts';
import type { PostData, PostsError } from '@/lib/posts';
import ArticleHeader from '@/components/features/Article/ArticleHeader';
import ArticleBody from '@/components/features/Article/ArticleBody';
import AuthorProfile from '@/components/features/Article/AuthorProfile';

type Props = {
  post: PostData;
};

export default function Post({ post }: Props) {
  const authorId = post.author ? encodeURIComponent(post.author.toLowerCase().replace(/\s+/g, '-')) : null;

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <article>
          <ArticleHeader
            title={post.title}
            publishedDate={post.date}
            authorName={post.author || '匿名'}
            authorLink={authorId ? `/author/${authorId}` : '#'}
          />
          <ArticleBody markdownContent={post.contentHtml} />
          {post.author && authorId && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <AuthorProfile authorName={post.author} authorLink={`/author/${authorId}`} />
            </div>
          )}
        </article>
      </div>
    </BaseLayout>
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
