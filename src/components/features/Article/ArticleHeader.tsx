import React from 'react';
import Heading from '@/components/common/Heading';
import Link from '@/components/common/Link';
import Paragraph from '@/components/common/Paragraph';
// import Image from 'next/image'; // 著者アバター用に後で検討

type ArticleHeaderProps = {
  title: string;
  authorName: string;
  authorLink: string; // 著者ページへのリンク
  publishedDate: string;
  authorAvatarUrl?: string; // オプションのアバター
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  authorName,
  authorLink,
  publishedDate,
  authorAvatarUrl,
}) => {
  return (
    <div className="mb-8 border-b border-neutral-200 pb-6">
      <Heading level={1} className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </Heading>
      <div className="flex items-center text-sm text-neutral-500 space-x-3">
        {authorAvatarUrl && (
          <div className="flex-shrink-0">
            {/* アバター表示 (仮) */}
            <div className="w-8 h-8 rounded-full bg-neutral-200" />
          </div>
        )}
        <div>
          <Link href={authorLink} className="font-medium text-neutral-700 hover:text-neutral-900">
            {authorName}
          </Link>
          <span className="mx-2">·</span>
          <time dateTime={publishedDate}>{publishedDate}</time>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
