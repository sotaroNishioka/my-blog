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
    'inline-flex items-center justify-center font-medium rounded-full transition duration-300 ease-in-out border-custom-button'; // border を border-custom-button に変更
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // variantに応じてスタイルを決定
  switch (variant) {
    case 'primary':
      // 背景色付きボタン (例: フッターのログインボタン)
      baseStyle =
        'inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-150 ease-in-out border-transparent text-white bg-neutral-800 hover:bg-neutral-700'; // border-transparent なので border-custom-button は不要
      break;
    default: // 'outline' のスタイルをしずかなインターネット風に更新
      baseStyle = `${commonStyle} px-6 py-3.5 text-base leading-custom-button tracking-custom-button text-main-body bg-main-bg border-main-300 hover:bg-main-100 hover:border-main-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`; // border-custom-button は commonStyle から継承し、色は border-main-300 で指定
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
