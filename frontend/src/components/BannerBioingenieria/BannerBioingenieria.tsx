import React from 'react'
import banner from "@/app/assets/img/bioingenieria.png"
import banner1 from "@/app/assets/img/bioingeniería1.png"
import banner2 from "@/app/assets/img/bioingenieria2.png"
import Image from 'next/image'
export default function BannerBioingenieria() {
  return (
    <div className='relative flex items-center w-full h-[369px] justify-center'>
        <Image src={banner} alt='banner bioingeniería'
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className=" hidden tablet:flex"
        />
        <Image src={banner1} alt='banner bioingeniería'
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className=" hidden movil:flex"
        />
        <Image src={banner2} alt='banner bioingeniería'
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className="flex"
        />
        <div className='z-10 space-y-6 text-center tablet:w-[435px] w-[320px]'>
            <h2 className='text-white text-start font-normal text-xl'>Nuestro compromiso con la humanidad.</h2>
            <p className='text-white text-start text-sm'>Los avances en biotecnología son grandes pasos para la humanidad y su salud. Comprometidos con esto, desarrollamos alianzas estratégicas con universidades, institutos e investigadores para colaborar con dichos desafíos</p>
            <button className='p-2 bg-newOrange text-white rounded-lg'>Quiero saber más</button>
        </div>
    </div>
  )
}
