import React from 'react';
import Link from '../common/Link';
import Heading from '../common/Heading';
import Paragraph from '../common/Paragraph';
import Button from '../common/Button';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-neutral-200 pt-8 pb-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="md:col-span-1 space-y-4">
          <Heading level={2} className="text-lg font-semibold mb-0 border-none pb-0">
            <Link href="/" className="text-neutral-800 hover:text-neutral-600 no-underline hover:no-underline">
              My Blog
            </Link>
          </Heading>
          <Paragraph className="text-sm text-neutral-600 mb-0">
            日記やエッセイにちょうどいい
            <br />
            文章書き散らしサービス
          </Paragraph>
          <Button className="w-full md:w-auto bg-black text-white hover:bg-gray-800">ログイン</Button>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <Heading level={3} className="text-sm font-semibold text-neutral-500 mb-2 border-none pb-0">
              ナビゲーション
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-neutral-800">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-neutral-800">
                  使い方
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-neutral-600 hover:text-neutral-800">
                  タグ一覧
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading level={3} className="text-sm font-semibold text-neutral-500 mb-2 border-none pb-0">
              その他
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="text-neutral-600 hover:text-neutral-800">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-600 hover:text-neutral-800">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-neutral-600 hover:text-neutral-800">
                  サポート
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading level={3} className="text-sm font-semibold text-neutral-500 mb-2 border-none pb-0">
              関連リンク
            </Heading>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://github.com/sotaroNishioka/my-blog"
                  isExternal
                  className="text-neutral-600 hover:text-neutral-800"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center text-xs text-neutral-400 px-4 mt-8 pt-4 border-t border-neutral-100">
        &copy; {currentYear} My Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
