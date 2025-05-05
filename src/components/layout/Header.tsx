import React from 'react';
import Link from '../common/Link'; // 作成したLinkコンポーネントを使用
import Heading from '../common/Heading';

type HeaderProps = {
  siteTitle?: string;
};

export const Header: React.FC<HeaderProps> = ({ siteTitle = 'My Blog' }) => {
  return (
    <header className="border-b border-neutral-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <Heading level={1} className="text-xl font-semibold mb-4 md:mb-0">
            <Link href="/" className="text-neutral-800 hover:text-neutral-600 no-underline hover:no-underline">
              {siteTitle}
            </Link>
          </Heading>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-neutral-800">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-neutral-600 hover:text-neutral-800">
                  著者一覧
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-neutral-600 hover:text-neutral-800">
                  タグ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
