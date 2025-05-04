import React from 'react';
import TagBadge from '@/components/common/TagBadge'; // 作成したTagBadgeを使用

type ArticleTagsProps = {
  tags: string[];
  className?: string;
};

export const ArticleTags: React.FC<ArticleTagsProps> = ({ tags, className }) => {
  if (!tags || tags.length === 0) {
    return null; // タグがなければ何も表示しない
  }

  return (
    <div className={`mt-6 mb-4 ${className || ''}`}>
      {' '}
      {/* 少し上下にマージン */}
      {tags.map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default ArticleTags;
