import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Post from '@/pages/posts/[id]';
import { PostData } from '@/lib/posts';

// モックコンポーネント
jest.mock('@/components/layout/BaseLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-layout">{children}</div>,
}));

jest.mock('@/components/features/Article/ArticleHeader', () => ({
  __esModule: true,
  default: ({
    title,
    publishedDate,
    authorName,
    authorLink,
  }: { title: string; publishedDate: string; authorName: string; authorLink: string }) => (
    <div data-testid="mock-article-header">
      <h1>{title}</h1>
      <p>{publishedDate}</p>
      <a href={authorLink}>{authorName}</a>
    </div>
  ),
}));

jest.mock('@/components/features/Article/ArticleBody', () => ({
  __esModule: true,
  default: ({ markdownContent }: { markdownContent: string }) => (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <Test mock>
    <div data-testid="mock-article-body" dangerouslySetInnerHTML={{ __html: markdownContent }} />
  ),
}));

jest.mock('@/components/features/Article/AuthorProfile', () => ({
  __esModule: true,
  default: ({ authorName, authorLink }: { authorName: string; authorLink: string }) => (
    <div data-testid="mock-author-profile">
      <a href={authorLink}>{authorName}</a>
    </div>
  ),
}));

describe('Post Page', () => {
  const mockPost: PostData = {
    id: 'test-post',
    title: 'テスト投稿のタイトル',
    date: '2024-05-06',
    tags: ['React', 'Next.js'],
    author: 'テスト太郎',
    contentHtml: '<p>これは<strong>テスト用</strong>のHTMLコンテンツです。</p>',
  };

  const mockPostWithoutAuthor: PostData = {
    id: 'test-post-no-author',
    title: '著者なしテスト投稿',
    date: '2024-05-05',
    tags: ['Test'],
    contentHtml: '<p>著者情報がないテスト。</p>',
  };

  it('記事のヘッダー、本文、著者プロフィールが正しく表示されること', () => {
    render(<Post post={mockPost} />);

    // レイアウトがあるか
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();

    // ヘッダーがあるか
    const header = screen.getByTestId('mock-article-header');
    expect(header).toBeInTheDocument();
    expect(within(header).getByText(mockPost.title)).toBeInTheDocument();
    expect(within(header).getByText(mockPost.date)).toBeInTheDocument();
    if (mockPost.author) {
      const expectedAuthorId = encodeURIComponent(mockPost.author.toLowerCase().replace(/\s+/g, '-'));
      const authorLinkInHeader = within(header).getByText(mockPost.author).closest('a');
      expect(authorLinkInHeader).toBeInTheDocument();
      expect(authorLinkInHeader).toHaveAttribute('href', `/author/${expectedAuthorId}`);
    }

    // 本文があるか
    expect(screen.getByTestId('mock-article-body')).toBeInTheDocument();
    expect(screen.getByTestId('mock-article-body').innerHTML).toBe(mockPost.contentHtml);

    // 著者プロフィールがあるか
    const authorProfile = screen.getByTestId('mock-author-profile');
    expect(authorProfile).toBeInTheDocument();
    if (mockPost.author) {
      const expectedAuthorId = encodeURIComponent(mockPost.author.toLowerCase().replace(/\s+/g, '-'));
      const authorLinkInProfile = within(authorProfile).getByText(mockPost.author).closest('a');
      expect(authorLinkInProfile).toBeInTheDocument();
      expect(authorLinkInProfile).toHaveAttribute('href', `/author/${expectedAuthorId}`);
    }
  });

  it('著者がいない場合、匿名で表示され、著者プロフィールは表示されないこと', () => {
    render(<Post post={mockPostWithoutAuthor} />);

    // ヘッダーで著者が「匿名」と表示されることを確認
    const header = screen.getByTestId('mock-article-header');
    expect(within(header).getByText('匿名')).toBeInTheDocument();
    const authorLink = within(header).getByText('匿名').closest('a');
    expect(authorLink).toHaveAttribute('href', '#');

    // 本文があるか
    expect(screen.getByTestId('mock-article-body')).toBeInTheDocument();
    expect(screen.getByTestId('mock-article-body').innerHTML).toBe(mockPostWithoutAuthor.contentHtml);

    // 著者プロフィールが表示されないことを確認
    expect(screen.queryByTestId('mock-author-profile')).not.toBeInTheDocument();
  });
});
