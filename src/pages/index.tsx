import type { GetStaticProps } from 'next';
// import Layout from '@/components/Layout'; // 古いLayoutを削除
import BaseLayout from '@/components/layout/BaseLayout'; // 新しいBaseLayoutを使用
import Heading from '@/components/common/Heading'; // Headingを使用
import Paragraph from '@/components/common/Paragraph'; // Paragraphを使用 (日付表示用)
import Link from '@/components/common/Link'; // Linkを使用 (タイトル用)
// import ArticleCard from '@/components/ArticleCard'; // ArticleCardはまだないのでコメントアウト
import { getSortedPostsData } from '@/lib/posts';
import type { PostData } from '@/lib/posts';

type Props = {
  posts: Omit<PostData, 'contentHtml'>[];
};

export default function Home({ posts }: Props) {
  return (
    // BaseLayoutを使用
    <BaseLayout siteTitle="My Blog">
      {' '}
      {/* サイトタイトルを渡す */}
      <div className="space-y-8">
        {/* Headingコンポーネントを使用 */}
        <Heading level={1}>Blog Posts</Heading>
        <div className="grid gap-8">
          {' '}
          {/* gapを少し広げる */}
          {posts.map((post) => (
            // ArticleCardの代わりに仮実装
            <article key={post.id}>
              <Heading level={2} className="text-xl mb-1 border-none pb-0">
                {' '}
                {/* 記事タイトルはh2 */}
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </Heading>
              <Paragraph className="text-sm text-neutral-500 mb-0">
                {post.date}
                {post.tags && post.tags.length > 0 && (
                  <span className="ml-4">Tags: {post.tags.join(', ')}</span> // 仮のタグ表示
                )}
              </Paragraph>
              {/* TODO: Issue #35 で ArticleCard コンポーネントを作成し、置き換える */}
            </article>
            // <ArticleCard key={post.id} id={post.id} title={post.title} date={post.date} tags={post.tags} />
          ))}
        </div>
      </div>
    </BaseLayout>
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
