import Link from 'next/link';

// ArticleCardに渡すPropsの型定義
type ArticleCardProps = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

export default function ArticleCard({ id, title, date, tags }: ArticleCardProps) {
  return (
    <article className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${id}`} className="block space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="text-gray-500">{date}</div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
