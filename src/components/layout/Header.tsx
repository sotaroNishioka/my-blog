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
        <Heading level={1} className="text-xl font-semibold mb-0">
          <Link href="/" className="text-neutral-800 hover:text-neutral-600 no-underline hover:no-underline">
            {siteTitle}
          </Link>
        </Heading>
      </div>
    </header>
  );
};

export default Header;
