import React from 'react';
import ArticleCard from './ArticleCard';
import { PostData } from '@/lib/posts';

type Article = Omit<PostData, 'contentHtml'>;

type ArticleListProps = {
  articles: Article[];
  className?: string;
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles, className = '' }) => {
  if (articles.length === 0) {
    return <div className={`text-center p-6 ${className}`}>記事がありません。</div>;
  }

  return (
    <div className={className}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: Article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            date={article.date}
            tags={article.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList; 