import React from 'react';
import Link from '@/components/common/Link';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import TagBadge from '@/components/common/TagBadge';
import { PostData } from '@/lib/posts';

// posts.ts から型をインポート
type ArticleCardProps = Omit<PostData, 'contentHtml'>;

export const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, date, tags, author }) => {
  // 著者IDを作成（小文字にしてスペースをハイフンに置換）
  const authorId = author ? encodeURIComponent(author.toLowerCase().replace(/\s+/g, '-')) : null;

  return (
    <article className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <Heading level={2} className="text-xl mb-2 border-none pb-0">
        <Link href={`/posts/${id}`}>{title}</Link>
      </Heading>
      
      <div className="flex flex-wrap items-center text-sm text-neutral-500 mb-4">
        <time dateTime={date} className="mr-4">
          {date}
        </time>
        
        {author && authorId && (
          <span>
            <span className="mr-1">by</span>
            <Link href={`/author/${authorId}`} className="font-medium hover:text-neutral-800">
              {author}
            </Link>
          </span>
        )}
      </div>
      
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
