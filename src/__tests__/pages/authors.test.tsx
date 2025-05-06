import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthorsPage from '@/pages/authors';

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

jest.mock('@/components/common/Link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string; className?: string }) => (
    <a data-testid="mock-link" href={href}>
      {children}
    </a>
  ),
}));

describe('AuthorsPage', () => {
  it('著者一覧が正しく表示されること', () => {
    const mockProps = {
      authors: [
        { id: 'author-one', name: 'Author One', postCount: 3 },
        { id: 'author-two', name: 'Author Two', postCount: 2 },
        { id: 'author-three', name: 'Author Three', postCount: 1 },
      ],
    };

    render(<AuthorsPage {...mockProps} />);

    // レイアウトが表示されていることを確認
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();

    // 見出しが表示されていることを確認
    expect(screen.getByTestId('mock-heading-1')).toBeInTheDocument();
    expect(screen.getByText('著者一覧')).toBeInTheDocument();

    // 著者カードが表示されていることを確認
    expect(screen.getAllByTestId('mock-heading-2')).toHaveLength(3);
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('Author Two')).toBeInTheDocument();
    expect(screen.getByText('Author Three')).toBeInTheDocument();

    // 記事数が表示されていることを確認
    expect(screen.getByText('記事数: 3')).toBeInTheDocument();
    expect(screen.getByText('記事数: 2')).toBeInTheDocument();
    expect(screen.getByText('記事数: 1')).toBeInTheDocument();

    // リンクが正しいhref属性を持っていることを確認
    const links = screen.getAllByTestId('mock-link');
    expect(links[0]).toHaveAttribute('href', '/author/author-one');
    expect(links[1]).toHaveAttribute('href', '/author/author-two');
    expect(links[2]).toHaveAttribute('href', '/author/author-three');
  });

  it('著者が存在しない場合のメッセージが表示されること', () => {
    const mockProps = {
      authors: [],
    };

    render(<AuthorsPage {...mockProps} />);

    // 著者が見つからないメッセージが表示されることを確認
    expect(screen.getByText('著者が見つかりません。')).toBeInTheDocument();
  });
});
