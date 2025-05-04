import React from 'react';
import NextLink from 'next/link'; // next/link をインポート

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  // target?: '_blank' | '_self' | '_parent' | '_top'; // target属性を追加
  // rel?: string; // rel属性を追加
  isExternal?: boolean; // 外部リンクかどうかを判定するフラグ
};

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  // target,
  // rel,
  isExternal = false, // デフォルトは内部リンク
}) => {
  // しずかなインターネットのスタイルに合わせる
  const baseStyle =
    'text-main-800 hover:text-main-600 underline decoration-main-400 hover:decoration-main-500 decoration-dotted decoration-1 underline-offset-4 transition duration-250 ease-in-out';

  if (isExternal || href.startsWith('http')) {
    // isExternalフラグがtrue、またはhrefがhttp(s)で始まる場合は外部リンクとして通常のaタグを使用
    return (
      <a
        href={href}
        className={`${baseStyle} ${className || ''}`}
        target="_blank" // 外部リンクは基本的に新しいタブで開く
        rel="noopener noreferrer" // セキュリティ対策
      >
        {children}
      </a>
    );
  }

  // 内部リンクの場合: NextLinkに直接スタイルを適用し、子要素のaタグは削除
  return (
    <NextLink href={href} className={`${baseStyle} ${className || ''}`}>
      {children}
    </NextLink>
  );
};

export default Link;
