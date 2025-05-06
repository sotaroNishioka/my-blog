import React from 'react';
import { render, screen } from '@testing-library/react';
import TagsPage from '@/pages/tags';

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
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a data-testid="mock-tag-link" href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('TagsPage', () => {
  it('タグ一覧が正しく表示され、記事数が多い順にソートされていること', () => {
    const mockProps = {
      tags: [
        { name: 'React', count: 5 },
        { name: 'Next.js', count: 3 },
        { name: 'TypeScript', count: 2 },
      ],
    };

    render(<TagsPage {...mockProps} />);

    // レイアウトが表示されていることを確認
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();

    // 見出しが表示されていることを確認
    expect(screen.getByTestId('mock-heading-1')).toBeInTheDocument();
    expect(screen.getByText('タグ一覧')).toBeInTheDocument();

    // タグリンクが表示されていることを確認
    const tagLinks = screen.getAllByTestId('mock-tag-link');
    expect(tagLinks).toHaveLength(3);

    // 表示順序（記事数順）を確認
    expect(tagLinks[0]).toHaveTextContent('React(5)');
    expect(tagLinks[1]).toHaveTextContent('Next.js(3)');
    expect(tagLinks[2]).toHaveTextContent('TypeScript(2)');

    // リンクのhref属性を確認
    expect(tagLinks[0]).toHaveAttribute('href', '/tags/React');
    expect(tagLinks[1]).toHaveAttribute('href', '/tags/Next.js');
    expect(tagLinks[2]).toHaveAttribute('href', '/tags/TypeScript');
  });

  it('タグが存在しない場合のメッセージが表示されること', () => {
    const mockProps = {
      tags: [],
    };

    render(<TagsPage {...mockProps} />);

    // タグが見つからないメッセージが表示されることを確認
    expect(screen.getByText('タグが見つかりません。')).toBeInTheDocument();
  });
});
