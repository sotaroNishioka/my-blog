import path from 'path';
import {
  getAllAuthorIds,
  getAuthorNameFromId,
  getPostsByAuthor,
  getAllTagsWithCount,
  getAllTagIds,
  getPostsByTag,
} from '@/lib/posts';

// モックファイルシステム
jest.mock('node:fs', () => {
  const originalFs = jest.requireActual('node:fs');
  const testFixturesPath = path.join(process.cwd(), 'src/__tests__/fixtures');

  return {
    readdirSync: jest.fn((dirPath) => {
      // postsディレクトリへの参照をテストフィクスチャディレクトリに置き換える
      if (dirPath.includes('/posts')) {
        return originalFs.readdirSync(path.join(testFixturesPath, 'posts'));
      }
      return originalFs.readdirSync(dirPath);
    }),
    readFileSync: jest.fn((filePath, encoding) => {
      // postsディレクトリへの参照をテストフィクスチャディレクトリに置き換える
      if (filePath.includes('/posts/')) {
        const fileName = path.basename(filePath);
        const testPath = path.join(testFixturesPath, 'posts', fileName);
        return originalFs.readFileSync(testPath, encoding);
      }
      return originalFs.readFileSync(filePath, encoding);
    }),
  };
});

// jest.mockされたモジュールの型を解決するためのアサーション
const fs = jest.requireMock('node:fs');

describe('posts.ts', () => {
  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks();
  });

  describe('著者関連機能', () => {
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

  describe('タグ関連機能', () => {
    describe('getAllTagsWithCount', () => {
      it('すべてのタグとその記事数を取得できること', () => {
        const result = getAllTagsWithCount();
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toEqual({
            test: 2,
            author1: 1,
            author2: 1,
          });
        }
      });
    });

    describe('getAllTagIds', () => {
      it('すべてのタグIDを取得できること (URLエンコード済み)', () => {
        const result = getAllTagIds();
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(3);
          expect(result.value).toEqual(
            expect.arrayContaining([
              { params: { tag: 'test' } },
              { params: { tag: 'author1' } },
              { params: { tag: 'author2' } },
            ])
          );
        }
      });
    });

    describe('getPostsByTag', () => {
      it('特定のタグを持つ記事を取得できること', () => {
        const result = getPostsByTag('test'); // URLエンコードされていないタグで検索
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(2);
          expect(result.value.some((p) => p.id === 'test-author1')).toBe(true);
          expect(result.value.some((p) => p.id === 'test-author2')).toBe(true);
        }
      });

      it('URLエンコードされたタグ名でも記事を取得できること', () => {
        const result = getPostsByTag(encodeURIComponent('test')); // URLエンコードされたタグで検索
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(2);
        }
      });

      it('特定のタグのみを持つ記事を取得できること', () => {
        const result = getPostsByTag('author1');
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(1);
          expect(result.value[0].id).toBe('test-author1');
        }
      });

      it('存在しないタグの場合は空の配列を返すこと', () => {
        const result = getPostsByTag('non-existent-tag');
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(0);
        }
      });
    });
  });
});
