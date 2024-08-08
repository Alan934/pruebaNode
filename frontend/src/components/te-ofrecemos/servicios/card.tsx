import React from 'react'
import { lexend } from '@/app/fonts';
import Image from 'next/image';

interface CardProps {
    urlImagenCard: string;
    nombreCard: string;
    items: string[];
  }
const Card:React.FC<CardProps> = ({urlImagenCard, nombreCard, items}) => {
  return (
    <div className="w-80 flex-col justify-start items-start inline-flex
    desktop:w-[339px]" >
      <section className=" h-[259px] p-4 bg-zinc-50 rounded-lg border flex-col justify-start items-start gap-4 flex 
      desktop:p-5">
          <div className='self-stretch h-[145px] flex-col justify-start items-center gap-[7px] flex'>
              <Image
              className="justify-center items-center inline-flex"
              width={110}
              height={110}
              src={urlImagenCard}
              alt='Imagen de card'
              />
              <p className={`${lexend.className} self-stretch text-center text-blue-950 text-xl font-semibold leading-7`}>{nombreCard}</p>
          </div>
          <div className='w-[288px] h-[66px] items-center mb-4'>
            <div className={`${lexend.className}  self-stretch text-slate-950 text-sm font-light leading-snug`}>
            { items.length > 1 ? (
              <ul className="list-disc pl-5" >
                {items.map((item, index) =>(
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{items[0]}</p>
            )}
            </div>
          </div>
      </section>
      </div>
  );
};

export default Card;
