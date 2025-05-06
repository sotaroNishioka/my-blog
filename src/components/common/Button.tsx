import React from 'react';
// import { twMerge } from 'tailwind-merge'; // この行を削除またはコメントアウト

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // HTMLのbutton type
  disabled?: boolean;
  variant?: 'outline' | 'primary'; // スタイルのバリアントを維持
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
  variant = 'primary', // デフォルトを 'primary' に変更
}) => {
  let variantStyle = '';
  // commonStyle は outline variant でのみ使用するように変更
  const commonOutlineStyle =
    'inline-flex items-center justify-center font-medium rounded-full transition duration-300 ease-in-out border-custom-button';
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // variantに応じてスタイルを決定
  switch (variant) {
    case 'primary':
      // 背景色付きボタン (例: フッターのログインボタン)
      // 共通スタイル要素をこちらに含める（inline-flexなど）
      variantStyle =
        'inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-150 ease-in-out border-transparent text-white bg-neutral-800 hover:bg-neutral-700';
      break;
    default:
      variantStyle = `${commonOutlineStyle} px-6 py-3.5 text-base leading-custom-button tracking-custom-button text-main-body bg-main-bg border-main-300 hover:bg-main-100 hover:border-main-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`;
      break;
  }

  // twMerge を使わない形に戻す
  const mergedClassName = `${variantStyle} ${disabledStyle} ${className || ''}`.trim();

  return (
    <button type={type} onClick={onClick} className={mergedClassName} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
