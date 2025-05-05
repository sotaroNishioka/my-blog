import { GetStaticProps } from 'next';
import React from 'react';
import Link from '@/components/common/Link';
import BaseLayout from '@/components/layout/BaseLayout';
import Heading from '@/components/common/Heading';
import { getAllTagsWithCount } from '@/lib/posts';

type TagInfo = {
  name: string;
  count: number;
};

type TagsPageProps = {
  tags: TagInfo[];
};

export default function TagsPage({ tags }: TagsPageProps) {
  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <Heading level={1} className="mb-8">
          タグ一覧
        </Heading>

        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${encodeURIComponent(tag.name)}`}
              className="block border border-neutral-200 rounded-lg px-4 py-2 hover:bg-neutral-50 transition-colors duration-150"
            >
              <span className="font-medium">{tag.name}</span>
              <span className="ml-2 text-sm text-neutral-500">({tag.count})</span>
            </Link>
          ))}
        </div>

        {tags.length === 0 && <p className="text-center p-6">タグが見つかりません。</p>}
      </div>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
  const tagsResult = getAllTagsWithCount();

  if (tagsResult.isErr()) {
    console.error('Error fetching tags:', tagsResult.error);
    return {
      props: {
        tags: [],
      },
    };
  }

  const tagCounts = tagsResult.value;
  const tags: TagInfo[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // 記事数の多い順にソート

  return {
    props: {
      tags,
    },
  };
};
