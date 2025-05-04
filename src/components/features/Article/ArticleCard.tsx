import React from 'react';
import Link from '@/components/common/Link';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import TagBadge from '@/components/common/TagBadge';

// posts.ts から Omit<PostData, 'contentHtml'> をインポートしたいが、一旦定義
// TODO: src/types/index.ts などで共通化を検討
type ArticleCardProps = {
  id: string;
  title: string;
  date: string;
  tags?: string[];
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, date, tags }) => {
  return (
    <article className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <Heading level={2} className="text-xl mb-2 border-none pb-0">
        <Link href={`/posts/${id}`}>{title}</Link>
      </Heading>
      <Paragraph className="text-sm text-neutral-500 mb-4">
        <time dateTime={date}>{date}</time>
      </Paragraph>
      {tags && tags.length > 0 && (
        <div className="mt-2">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
};

export default ArticleCard;
