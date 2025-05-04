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
  const commonStyle =
    'inline-flex items-center justify-center px-4 py-2 border text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-150 ease-in-out';
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // variantに応じてスタイルを決定
  switch (variant) {
    case 'primary':
      // 背景色付きボタン (例: フッターのログインボタン)
      baseStyle = `${commonStyle} border-transparent text-white bg-neutral-800 hover:bg-neutral-700`;
      break;
    default: // 'outline' のスタイルをデフォルトにする
      // 枠線ボタン
      baseStyle = `${commonStyle} border-neutral-300 text-neutral-700 bg-transparent hover:bg-neutral-50`;
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
