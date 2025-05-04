import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // HTMLのbutton type
  disabled?: boolean;
  variant?: 'outline' | 'primary'; // スタイルのバリアントを追加
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
  variant = 'outline', // デフォルトは 'outline'
}) => {
  let baseStyle = '';
  // 共通スタイルを更新: padding, font-size, focus は削除 (variant で指定するため)
  const commonStyle =
    'inline-flex items-center justify-center border font-medium rounded-full transition duration-250 ease-in-out tracking-wider'; // rounded-full, tracking-wider, duration-250 を追加
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // variantに応じてスタイルを決定
  switch (variant) {
    case 'primary':
      // 背景色付きボタン (例: フッターのログインボタン)
      baseStyle =
        'inline-flex items-center justify-center px-4 py-2 border text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-150 ease-in-out border-transparent text-white bg-neutral-800 hover:bg-neutral-700'; // 元のスタイルを保持
      break;
    default: // 'outline' のスタイルをしずかなインターネット風に更新
      baseStyle = `${commonStyle} px-6 py-3.5 text-base text-main-body bg-main-bg border-main-300 hover:bg-main-100 hover:border-main-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`; // px, py, text, bg, border, hover, focus を更新
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      // variantのスタイルと追加のclassNameを結合
      className={`${baseStyle} ${disabledStyle} ${className || ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
