import React from 'react';
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
// import Image from 'next/image'; // アバター用に後で追加

type UserProfileHeaderProps = {
  userName: string;
  description?: string;
  avatarUrl?: string; // アバター画像のURL (オプション)
};

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userName, description, avatarUrl }) => {
  return (
    <div className="flex items-center space-x-4 border-b border-neutral-200 pb-6 mb-8">
      {/* TODO: アバター表示を追加 */}
      {avatarUrl && (
        <div className="flex-shrink-0">
          {/* <Image src={avatarUrl} alt={`${userName} avatar`} width={80} height={80} className="rounded-full" /> */}
          <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
            Avatar
          </div>{' '}
          {/* 仮のアバタープレースホルダー */}
        </div>
      )}
      <div>
        <Heading level={1} className="text-2xl mb-1 border-none pb-0">
          {userName}
        </Heading>
        {description && <Paragraph className="text-neutral-600 text-sm mb-0">{description}</Paragraph>}
      </div>
    </div>
  );
};

export default UserProfileHeader;
