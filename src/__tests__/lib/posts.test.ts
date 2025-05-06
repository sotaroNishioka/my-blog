import path from 'path';
import {
  getAllAuthorIds,
  getAuthorNameFromId,
  getPostsByAuthor,
  getAllTagsWithCount,
  getAllTagIds,
  getPostsByTag,
  getSortedPostsData,
  getAllPostIds,
  getPostData,
} from '@/lib/posts';

// モックファイルシステム
jest.mock('node:fs', () => {
  const originalFs = jest.requireActual('node:fs');
  const testFixturesPath = path.join(process.cwd(), 'src/__tests__/fixtures');

  return {
    readdirSync: jest.fn((dirPath) => {
      if (dirPath.toString().includes('nonexistent')) {
        throw new Error('ENOENT: no such file or directory');
      }
      if (dirPath.includes('/posts')) {
        return originalFs.readdirSync(path.join(testFixturesPath, 'posts'));
      }
      return originalFs.readdirSync(dirPath);
    }),
    readFileSync: jest.fn((filePath, encoding) => {
      if (filePath.includes('error-read.md')) {
        throw new Error('Failed to read file');
      }
      if (filePath.includes('invalid-fm.md')) {
        // 不正なFrontmatterを持つファイルの内容を返す
        return `title: Test
date: 2024-01-01
---
Content`;
      }
      if (filePath.includes('/posts/')) {
        const fileName = path.basename(filePath);
        const testPath = path.join(testFixturesPath, 'posts', fileName);
        // ファイルが存在しない場合のエラーをシミュレート
        if (!originalFs.existsSync(testPath)) {
          const error = new Error(`ENOENT: no such file or directory, open '${filePath}'`);
          (error as NodeJS.ErrnoException).code = 'ENOENT';
          throw error;
        }
        return originalFs.readFileSync(testPath, encoding);
      }
      return originalFs.readFileSync(filePath, encoding);
    }),
    existsSync: jest.fn((filePath) => {
      // readFileSync内のエラーシミュレーションのためにexistsSyncもモック
      if (filePath.includes('nonexistent-file.md')) return false;
      return originalFs.existsSync(filePath);
    }),
  };
});

// markedとgray-matterもモック
jest.mock('marked', () => ({
  marked: jest.fn().mockImplementation(async (content) => {
    if (content === 'error-parse') throw new Error('Markdown parse error');
    return `<p>${content}</p>`;
  }),
}));

jest.mock('gray-matter', () => {
  const originalMatter = jest.requireActual('gray-matter');
  return jest.fn().mockImplementation((content) => {
    if (content.includes('invalid-frontmatter')) {
      // 不正なFrontmatterをシミュレート
      return { data: {}, content: 'Invalid frontmatter test' };
    }
    // テストフィクスチャから読み込んだ内容をそのままパース
    return originalMatter(content);
  });
});

const fs = jest.requireMock('node:fs');
const matter = jest.requireMock('gray-matter');
const { marked } = jest.requireMock('marked');

describe('posts.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 各テスト前にreadFileSyncのモック挙動を設定（正常系）
    const originalFs = jest.requireActual('node:fs');
    const testFixturesPath = path.join(process.cwd(), 'src/__tests__/fixtures');
    fs.readFileSync.mockImplementation((filePath: string, encoding: string) => {
      if (filePath.includes('/posts/')) {
        const fileName = path.basename(filePath);
        const testPath = path.join(testFixturesPath, 'posts', fileName);
        if (!originalFs.existsSync(testPath)) {
          const error = new Error(`ENOENT: no such file or directory, open '${filePath}'`);
          (error as NodeJS.ErrnoException).code = 'ENOENT';
          throw error;
        }
        return originalFs.readFileSync(testPath, encoding);
      }
      return originalFs.readFileSync(filePath, encoding);
    });
    // gray-matterのモック挙動を設定（正常系）
    const originalMatter = jest.requireActual('gray-matter');
    matter.mockImplementation((content: string) => originalMatter(content));
    // markedのモック挙動を設定（正常系）
    marked.mockImplementation(async (content: string) => `<p>${content}</p>`);
  });

  describe('Core Functions', () => {
    describe('getSortedPostsData', () => {
      it('記事データを日付の降順で正しくソートして取得できること', () => {
        const result = getSortedPostsData();
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const posts = result.value;
          expect(posts).toHaveLength(2);
          expect(posts[0].id).toBe('test-author2'); // 2024-01-02
          expect(posts[1].id).toBe('test-author1'); // 2024-01-01
          expect(posts[0].title).toBe('Test Post Author 2');
          expect(posts[1].title).toBe('Test Post Author 1');
        }
      });

      it('postsディレクトリが存在しない場合にエラーを返すこと', () => {
        fs.readdirSync.mockImplementationOnce(() => {
          throw new Error('ENOENT');
        });
        const result = getSortedPostsData();
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe('DirectoryNotFound');
        }
      });

      it('ファイル読み込みエラー時にエラーを返すこと', () => {
        fs.readFileSync.mockImplementationOnce(() => {
          throw new Error('Read error');
        });
        const result = getSortedPostsData();
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          // readFileSyncのエラーはReadFileErrorとして扱われる
          expect(result.error.type).toBe('ReadFileError');
        }
      });
    });

    describe('getAllPostIds', () => {
      it('すべての記事IDを正しい形式で取得できること', () => {
        const result = getAllPostIds();
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(2);
          expect(result.value).toEqual(
            expect.arrayContaining([{ params: { id: 'test-author1' } }, { params: { id: 'test-author2' } }])
          );
        }
      });

      it('postsディレクトリが存在しない場合にエラーを返すこと', () => {
        fs.readdirSync.mockImplementationOnce(() => {
          throw new Error('ENOENT');
        });
        const result = getAllPostIds();
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe('DirectoryNotFound');
        }
      });
    });

    describe('getPostData', () => {
      it('指定されたIDの記事データを正しく取得できること', async () => {
        const result = await getPostData('test-author1');
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const post = result.value;
          expect(post.id).toBe('test-author1');
          expect(post.title).toBe('Test Post Author 1');
          expect(post.date).toBe('2024-01-01');
          expect(post.tags).toEqual(['test', 'author1']);
          expect(post.author).toBe('Author One');
          // 期待値を実際の出力に合わせる (改行の扱いの違いを吸収)
          expect(post.contentHtml.replace(/\n/g, '')).toBe(
            '<p>This is a test post by Author One for testing purposes. </p>'.replace(/\n/g, '')
          );
        }
      });

      it('存在しないIDの記事を取得しようとした場合にエラーを返すこと', async () => {
        // readFileSyncがENOENTエラーを投げるようにモックを調整
        fs.readFileSync.mockImplementationOnce(() => {
          const error = new Error('ENOENT: no such file or directory');
          (error as NodeJS.ErrnoException).code = 'ENOENT';
          throw error;
        });
        const result = await getPostData('non-existent-id');
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe('FileNotFound');
        }
      });

      it('Markdownのパースに失敗した場合にエラーを返すこと', async () => {
        // markedがエラーを投げるようにモック
        marked.mockImplementationOnce(async () => {
          throw new Error('Parse error');
        });
        const result = await getPostData('test-author1');
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe('MarkdownParseError');
        }
      });

      it('Frontmatterのパースに失敗した場合にエラーを返すこと', async () => {
        // gray-matterがエラーを投げるようにモック
        matter.mockImplementationOnce(() => {
          throw new Error('Matter error');
        });
        const result = await getPostData('test-author1');
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          // gray-matterのエラーはReadFileErrorとして処理される
          expect(result.error.type).toBe('ReadFileError');
        }
      });
    });
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
