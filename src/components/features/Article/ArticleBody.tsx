import React, { FC } from 'react';
import { marked } from 'marked';

interface ArticleBodyProps {
  /** Markdown形式の本文 */
  markdownContent: string;
}

/**
 * Markdown形式の本文を表示するコンポーネント
 * @param markdownContent - 表示するMarkdownコンテンツ
 */
export const ArticleBody: FC<ArticleBodyProps> = ({ markdownContent }) => {
  const htmlContent = marked.parse(markdownContent);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ArticleBody;
