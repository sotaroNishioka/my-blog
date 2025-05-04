import React from 'react';
import Link from './Link'; // 同じディレクトリ内のLinkを使用

type TagBadgeProps = {
  tag: string;
  className?: string;
};

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, className }) => {
  // TODO: slugify the tag for the URL if necessary
  const tagUrl = `/tags/${encodeURIComponent(tag.toLowerCase())}`;
  const baseStyle =
    'inline-block bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded transition duration-150 ease-in-out';

  return (
    <Link href={tagUrl} className={`${baseStyle} ${className || ''} no-underline hover:no-underline`}>
      {tag}
    </Link>
  );
};

export default TagBadge;
