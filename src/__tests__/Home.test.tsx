import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import { getStaticProps } from "@/pages/index";

// モックデータ
const mockPosts = [
  {
    id: "test-post-1",
    title: "Test Post 1",
    date: "2024-01-01",
    tags: ["tag1", "tag2"],
  },
  {
    id: "test-post-2",
    title: "Test Post 2",
    date: "2024-01-02",
    tags: ["tag3"],
  },
];

describe("Home page", () => {
  it("renders blog posts heading", () => {
    render(<Home posts={[]} />);
    expect(
      screen.getByRole("heading", { name: /Blog Posts/i })
    ).toBeInTheDocument();
  });

  it("renders multiple posts", () => {
    render(<Home posts={mockPosts} />);

    // 各投稿のタイトルが表示されているか確認
    expect(
      screen.getByRole("heading", { name: /Test Post 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Test Post 2/i })
    ).toBeInTheDocument();

    // 投稿の数が正しいか確認 (article タグで判断)
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders post metadata (date and tags)", () => {
    render(<Home posts={mockPosts} />);

    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();

    expect(screen.getByText("2024-01-02")).toBeInTheDocument();
    expect(screen.getByText("tag3")).toBeInTheDocument();
  });
});

// getStaticProps のテストはここでは省略します
// (ファイルシステムへのアクセスが必要なため、別途モック戦略が必要です)
