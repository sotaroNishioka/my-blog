import React from 'react';
import Link from '@/components/common/Link';
import Paragraph from '@/components/common/Paragraph';
// import Image from 'next/image';

type AuthorProfileProps = {
  authorName: string;
  authorLink: string;
  avatarUrl?: string;
  description?: string;
  // snsLinks?: { platform: string; url: string }[]; // 将来的にSNSリンクなどを追加
};

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ authorName, authorLink, avatarUrl, description }) => {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 flex items-start space-x-4">
      {/* アバター */}
      <div className="flex-shrink-0">
        <Link href={authorLink} className="block">
          {avatarUrl ? (
            // <Image src={avatarUrl} alt={authorName} width={56} height={56} className="rounded-full" />
            <div className="w-14 h-14 rounded-full bg-neutral-200" /> // 仮 & 自己終了タグ
          ) : (
            <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 text-xs">
              No Avatar
            </div>
          )}
        </Link>
      </div>

      {/* 名前と説明 */}
      <div className="flex-grow">
        <Link
          href={authorLink}
          className="text-lg font-semibold text-neutral-800 hover:text-neutral-600 no-underline hover:no-underline"
        >
          {authorName}
        </Link>
        {description && <Paragraph className="text-sm text-neutral-600 mt-1 mb-0">{description}</Paragraph>}
        {/* TODO: SNSリンクなどを表示 */}
      </div>
    </div>
  );
};

export default AuthorProfile;
