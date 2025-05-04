import React from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

export const Heading: React.FC<HeadingProps> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  let baseStyle = '';
  const textColor = 'text-main-body'; // テキスト色を main-body に統一

  // レベルに応じてサイズ、太さ、マージンを調整
  switch (level) {
    case 1:
      // ページタイトルなど、最も重要な見出し
      baseStyle = `text-3xl font-bold ${textColor} mb-8`;
      break;
    case 2:
      // セクションタイトルなど
      baseStyle = `text-2xl font-semibold ${textColor} mb-6 border-b pb-2`; // 下線を追加して区切りを明確に
      break;
    case 3:
      // サブセクションタイトル
      baseStyle = `text-xl font-semibold ${textColor} mb-4`;
      break;
    case 4:
      baseStyle = `text-lg font-semibold ${textColor} mb-3`;
      break;
    // h5, h6 は必要に応じて追加するのだ
    default:
      baseStyle = `text-lg font-semibold ${textColor} mb-3`; // h4 と同じスタイルを仮に適用
  }

  return <Tag className={`${baseStyle} ${className || ''}`}>{children}</Tag>;
};

export default Heading;
