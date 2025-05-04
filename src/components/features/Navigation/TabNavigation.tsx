import React from 'react';
import Link from '@/components/common/Link'; // Linkコンポーネントを使用

type TabItem = {
  label: string;
  href: string;
};

type TabNavigationProps = {
  tabs: TabItem[];
  activeHref: string; // 現在アクティブなタブのhref
  className?: string;
};

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeHref, className }) => {
  return (
    <nav className={`border-b border-neutral-200 mb-8 ${className || ''}`}>
      <ul className="-mb-px flex space-x-6">
        {' '}
        {/* -mb-px で下のボーダーを重ねる */}
        {tabs.map((tab) => {
          const isActive = tab.href === activeHref;
          // アクティブなタブと非アクティブなタブでスタイルを切り替え
          const linkClassName = `inline-block py-3 px-1 border-b-2 font-medium text-sm ${
            isActive
              ? 'border-neutral-800 text-neutral-800' // アクティブ時のスタイル
              : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300' // 非アクティブ時のスタイル
          }`;

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                // Linkコンポーネントのデフォルトの下線を消す
                className={`${linkClassName} no-underline hover:no-underline`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TabNavigation;
