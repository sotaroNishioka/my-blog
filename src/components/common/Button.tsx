import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // HTMLのbutton type
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = 'button', disabled = false }) => {
  // しずかなインターネット風スタイル: 枠線ベースでより控えめに
  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 border border-neutral-300 text-base font-medium rounded-md text-neutral-700 bg-transparent hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-150 ease-in-out';
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${disabledStyle} ${className || ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
