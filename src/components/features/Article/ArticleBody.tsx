import React from 'react';

type ArticleBodyProps = {
  contentHtml: string; // Markdownから変換されたHTML文字列
  className?: string;
};

export const ArticleBody: React.FC<ArticleBodyProps> = ({ contentHtml, className }) => {
  // TODO: Tailwind Typography プラグインを導入して適用する
  const proseStyle = 'prose lg:prose-xl max-w-none'; // Typographyプラグイン用のクラス (仮)

  return (
    <div
      className={`${proseStyle} ${className || ''}`}
      // MarkdownからのHTMLを安全に表示するためdangerouslySetInnerHTMLを使用
      // サニタイズはmarked側で行う前提
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default ArticleBody;
