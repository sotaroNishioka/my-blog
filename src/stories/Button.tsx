import type { ReactNode } from 'react';

type ButtonProps = {
  /** ボタンに表示する内容 */
  children: ReactNode;
  /** プライマリーボタンかどうか */
  primary?: boolean;
  /** ボタンのサイズ */
  size?: 'small' | 'medium' | 'large';
  /** Tailwindのクラスを追加 */
  className?: string;
  /** クリックイベントハンドラ */
  onClick?: () => void;
};

/** Tailwind CSSを使った基本的なボタンコンポーネント */
export const Button = ({ primary = false, size = 'medium', children, className = '', ...props }: ButtonProps) => {
  const baseClasses = 'font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };
  const colorClasses = primary
    ? 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500';

  return (
    <button type="button" className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
