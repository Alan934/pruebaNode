'use client'
import Image from "next/image";
import { lexend } from "../../app/fonts";

import type { StaticImageData } from 'next/image';

interface Props {
  title: string;
  subtitle?: string;
  descripcion: string;
  image: StaticImageData
}

const HeroBanner: React.FC<Props> = ({image, title, subtitle, descripcion}) => {

  return (
    <div className="overflow-x-hidden">
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        <Image
          src={image}
          alt="fondo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          className="z-0 transform transition-transform duration-1000 ease-in-out scale-60 tablet:scale-105 desktop:scale-110"
        />
        <div className="absolute bottom-0 w-full px-4 z-20">
          <div className="max-w-2xl mx-auto tablet:max-w-5xl">
            <h2 className={`text-zinc-100 movil:leading-loose movil:text-2xl movil:font-semibold desktop:leading-10 desktop:text-4xl desktop:font-bold ${lexend.className}`}>
              {title}
            </h2>
            {subtitle && (
              <h3 className={`text-zinc-100 text-base font-semibold leading-6 mb-4 ${lexend.className}`}>
                {subtitle}
              </h3>
            )}
          </div>
        </div>
      </div>
      <p className={`
        text-slate-950 my-4 mx-4 max-w-2xl leading-snug font-normal text-sm ${lexend.className}
        tablet:max-w-5xl 
        laptop:mx-auto laptop:leading-7 laptop:text-lg`}>
        {descripcion}
      </p>
    </div>
  )
}

export default HeroBanner
