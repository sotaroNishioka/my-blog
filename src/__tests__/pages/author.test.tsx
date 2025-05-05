import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthorPage from '@/pages/author/[authorId]';
import { PostData } from '@/lib/posts';

// モックコンポーネント
jest.mock('@/components/layout/BaseLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-layout">{children}</div>,
}));

jest.mock('@/components/features/UserProfile/UserProfileHeader', () => ({
  __esModule: true,
  default: ({ userName, description }: { userName: string; description?: string }) => (
    <div data-testid="mock-user-profile">
      <h1>{userName}</h1>
      {description && <p>{description}</p>}
    </div>
  ),
}));

jest.mock('@/components/features/Navigation/TabNavigation', () => ({
  __esModule: true,
  default: ({ tabs, activeHref }: { tabs: { label: string; href: string }[]; activeHref: string }) => (
    <nav data-testid="mock-tab-navigation">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.href} data-active={tab.href === activeHref ? 'true' : 'false'}>
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  ),
}));

jest.mock('@/components/features/Article/ArticleList', () => ({
  __esModule: true,
  default: ({ articles }: { articles: Omit<PostData, 'contentHtml'>[] }) => (
    <div data-testid="mock-article-list">
      <span>記事数: {articles.length}</span>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  ),
}));

describe('AuthorPage', () => {
  const mockProps = {
    authorName: 'テスト著者',
    authorId: 'test-author',
    posts: [
      {
        id: 'test-post-1',
        title: 'テスト記事1',
        date: '2024-01-01',
        tags: ['test'],
        author: 'テスト著者',
      },
      {
        id: 'test-post-2',
        title: 'テスト記事2',
        date: '2024-01-02',
        tags: ['test'],
        author: 'テスト著者',
      },
    ],
  };

  it('著者情報と記事リストが正しく表示されること', () => {
    render(<AuthorPage {...mockProps} />);

    // レイアウトが表示されていることを確認
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();

    // 著者プロフィールが表示されていることを確認
    expect(screen.getByTestId('mock-user-profile')).toBeInTheDocument();
    expect(screen.getByText('テスト著者')).toBeInTheDocument();
    expect(screen.getByText('テスト著者の記事一覧')).toBeInTheDocument();

    // タブナビゲーションが表示されていることを確認
    expect(screen.getByTestId('mock-tab-navigation')).toBeInTheDocument();
    expect(screen.getByText('すべての記事')).toBeInTheDocument();

    // 記事リストが表示されていることを確認
    expect(screen.getByTestId('mock-article-list')).toBeInTheDocument();
    expect(screen.getByText('記事数: 2')).toBeInTheDocument();
    expect(screen.getByText('テスト記事1')).toBeInTheDocument();
    expect(screen.getByText('テスト記事2')).toBeInTheDocument();
  });

  it('記事がない場合も正しく表示されること', () => {
    const propsWithoutPosts = {
      ...mockProps,
      posts: [],
    };

    render(<AuthorPage {...propsWithoutPosts} />);

    // 記事数が0であることを確認
    expect(screen.getByText('記事数: 0')).toBeInTheDocument();
  });
});
