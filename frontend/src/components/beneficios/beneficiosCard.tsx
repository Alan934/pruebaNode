import React from 'react'
import  Image  from 'next/image';
import { lexend } from '@/app/fonts';

type BeneficiosCardProps = {
  url: string;
  alt: string; 
  text: string;
};

const BeneficiosCard = ({ url, alt, text }: BeneficiosCardProps) => {
  return (
    <section className="w-[150px] h-[182px] p-2 flex flex-col gap-5 text-center">
      <Image
        className="items-center"
        width={122}
        height={122}
        src={url}
        alt={alt} 
      />

      <p className={`${lexend.className} `}>{text}</p>
    </section>
  );
};

export default BeneficiosCard;
