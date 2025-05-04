import React from 'react';

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  const baseStyle = 'text-neutral-800 text-base leading-relaxed mb-6'; // 読みやすさと落ち着いた雰囲気を意識したスタイル
  return <p className={`${baseStyle} ${className || ''}`}>{children}</p>;
};

export default Paragraph;
