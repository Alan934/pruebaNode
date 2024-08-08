'use client'
import Image from "next/image";
import { lexend } from "@/app/fonts";
import Elipse1 from "@/app/assets/img/Ellipse 11.png"

const CollaborationSection: React.FC = () => {
  return (
    <div className=" mx-8 mb-10 flex flex-col gap-5
    laptop:mx-48
    dessktop:mx-48">
        <div className={`w-80 text-slate-950 text-xl font-semibold leading-7 ${lexend.className}`}>Colaboración Interdisciplinaria</div>
            <div className=" flex items-center justify-center">
                <div className="relative flex items-center justify-center w-[216.02px] h-[218px]">
                    <Image
                    src={Elipse1}
                    alt="Img"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    />
                </div>
            </div>
        <div className={` text-slate-950 text-sm font-normal leading-snug ${lexend.className} mx-auto`}
        >
        Nuestro enfoque integrado combina la experiencia en tecnología con un profundo conocimiento científico, permitiéndonos ofrecer soluciones 
        innovadoras y personalizadas que satisfacen las necesidades únicas de nuestros clientes en la industria.
        </div>
    </div>
  );
};

export default CollaborationSection;
