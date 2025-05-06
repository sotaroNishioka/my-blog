import React from 'react';
import { render, screen } from '@testing-library/react';
import TagPage from '@/pages/tags/[tag]';
import { PostData } from '@/lib/posts';

// useRouterのモックを追加
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    route: '/', // routeプロパティも追加
    replace: jest.fn(), // replaceメソッドも追加
    reload: jest.fn(), // reloadメソッドも追加
    back: jest.fn(), // backメソッドも追加
    prefetch: jest.fn().mockResolvedValue(undefined), // prefetchメソッドも追加
    beforePopState: jest.fn(), // beforePopStateメソッドも追加
    events: {
      // eventsオブジェクトも追加
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false, // isFallbackプロパティも追加
    isLocaleDomain: false, // isLocaleDomainプロパティも追加
    isReady: true, // isReadyプロパティも追加
    isPreview: false, // isPreviewプロパティも追加
  })),
}));

// モックコンポーネント
jest.mock('@/components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-layout">{children}</div>,
}));

jest.mock('@/components/common/Heading', () => ({
  __esModule: true,
  default: ({ children, level }: { children: React.ReactNode; level: number; className?: string }) => (
    <div data-testid={`mock-heading-${level}`}>{children}</div>
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

describe('TagPage', () => {
  const mockProps = {
    tag: 'test', // URLエンコードされていない想定
    posts: [
      {
        id: 'test-post-1',
        title: 'テスト記事1',
        date: '2024-01-01',
        tags: ['test', 'React'],
        author: '著者1',
      },
      {
        id: 'test-post-2',
        title: 'テスト記事2',
        date: '2024-01-02',
        tags: ['test', 'Next.js'],
        author: '著者2',
      },
    ],
  };

  const mockPropsEncodedTag = {
    tag: encodeURIComponent('Next.js'), // URLエンコードされたタグ
    posts: [
      {
        id: 'test-post-2',
        title: 'テスト記事2',
        date: '2024-01-02',
        tags: ['test', 'Next.js'],
        author: '著者2',
      },
    ],
  };

  it('タグ名と記事リストが正しく表示されること', () => {
    render(<TagPage {...mockProps} />);

    // レイアウトが表示されていることを確認
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();

    // 見出しが表示されていることを確認
    expect(screen.getByTestId('mock-heading-1')).toBeInTheDocument();
    expect(screen.getByText(`タグ: ${mockProps.tag}`)).toBeInTheDocument();

    // 記事リストが表示されていることを確認
    expect(screen.getByTestId('mock-article-list')).toBeInTheDocument();
    expect(screen.getByText('記事数: 2')).toBeInTheDocument();
    expect(screen.getByText('テスト記事1')).toBeInTheDocument();
    expect(screen.getByText('テスト記事2')).toBeInTheDocument();
  });

  it('URLエンコードされたタグ名でも正しく表示されること', () => {
    render(<TagPage {...mockPropsEncodedTag} />);

    // 見出しにデコードされたタグ名が表示されること
    expect(screen.getByText('タグ: Next.js')).toBeInTheDocument();

    // 記事リストが表示されていることを確認
    expect(screen.getByText('記事数: 1')).toBeInTheDocument();
    expect(screen.getByText('テスト記事2')).toBeInTheDocument();
  });

  it('記事がない場合も正しく表示されること', () => {
    const propsWithoutPosts = {
      ...mockProps,
      posts: [],
    };
    render(<TagPage {...propsWithoutPosts} />);
    expect(screen.getByText('記事数: 0')).toBeInTheDocument();
  });
});
