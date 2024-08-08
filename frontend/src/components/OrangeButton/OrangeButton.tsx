import { lexend } from '@/app/fonts';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const OrangeButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-orange-600 shadow-md rounded-lg py-2 px-4 flex justify-center items-center gap-2 hover:bg-orange-700 transition-colors
            movil:mb-0"
    >
      <div className={`text-zinc-100 text-base font-normal leading-[29.38px] ${lexend.className}`}>{text}</div>
    </button>
  );
};

export default OrangeButton;
