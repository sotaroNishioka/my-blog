import { render, screen } from '@testing-library/react';
import Layout from '@/components/Layout';

describe('Layout', () => {
  it('renders children and footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // ヘッダーのブログタイトルが表示されているか
    expect(screen.getByText('My Blog')).toBeInTheDocument();

    // 子要素が表示されているか
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // フッターのコピーライトが表示されているか (年を含む部分一致)
    expect(screen.getByText(/© \d{4} My Blog. Built with Next.js and TypeScript./)).toBeInTheDocument();
  });
});
