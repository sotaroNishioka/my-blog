import { getAllAuthorIds, getAuthorNameFromId, getPostsByAuthor } from '@/lib/posts';

// モックファイルシステム
jest.mock('node:fs', () => ({
  readdirSync: jest.fn(() => ['test-author1.md', 'test-author2.md']),
  readFileSync: jest.fn((path) => {
    if (path.includes('test-author1.md')) {
      return `---
title: 'Test Post Author 1'
date: '2024-01-01'
tags: ['test', 'author1']
author: 'Author One'
---
Test content 1`;
    }
    if (path.includes('test-author2.md')) {
      return `---
title: 'Test Post Author 2'
date: '2024-01-02'
tags: ['test', 'author2']
author: 'Author Two'
---
Test content 2`;
    }
    throw new Error(`File not found: ${path}`);
  }),
}));

// jest.mockされたモジュールの型を解決するためのアサーション
const fs = jest.requireMock('node:fs');

describe('posts.ts - 著者関連機能', () => {
  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks();
  });

  describe('getAllAuthorIds', () => {
    it('すべての著者IDを取得できること', () => {
      const result = getAllAuthorIds();

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        // 順序が重要でないため、配列の要素がすべて含まれているかをチェック
        expect(result.value).toHaveLength(2);
        expect(result.value).toEqual(
          expect.arrayContaining([{ params: { authorId: 'author-one' } }, { params: { authorId: 'author-two' } }])
        );
      }

      // ファイル読み込みが呼ばれたことの確認
      expect(fs.readdirSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalled();
    });
  });

  describe('getAuthorNameFromId', () => {
    it('著者IDから著者名を取得できること', () => {
      const authorName = getAuthorNameFromId('author-one');
      expect(authorName).toBe('author one');
    });

    it('空白を含む著者IDを正しく処理できること', () => {
      const authorName = getAuthorNameFromId('author-with-multiple-words');
      expect(authorName).toBe('author with multiple words');
    });
  });

  describe('getPostsByAuthor', () => {
    it('特定の著者の記事を取得できること', () => {
      const result = getPostsByAuthor('author-one');

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].title).toBe('Test Post Author 1');
        expect(result.value[0].author).toBe('Author One');
      }
    });

    it('存在しない著者の場合は空の配列を返すこと', () => {
      const result = getPostsByAuthor('non-existent-author');

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toHaveLength(0);
      }
    });
  });
});
