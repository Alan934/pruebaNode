import Image from "next/image";

import { lexend } from "@/app/fonts"
import IA from '@/app/assets/img/BioingenieriaIA.png'
import BlockChain from '@/app/assets/img/BioingenieriaBlockchain.png'

const Integracion = () => {
  return (
    <div className="max-w-2xl movil:mx-10 tablet:mx-8 laptop:mx-auto my-8 tablet:max-w-5xl">
    <p className={`text-2xl font-semibold text-black mb-8 ${lexend.className}`}>
      Integración de Tecnologías Emergentes en Biotecnologia
    </p>
    <div className="flex justify-center">
      <div className={`w-[379px] h-[132px] flex justify-start items-start gap-4 ${lexend.className}`}>
        <p className="text-sm text-slate-950 font-normal leading-snug">
          Desarrollamos aplicaciones de{" "}
          <span className="text-blue-950 text-base font-bold">inteligencia artificial</span>{" "}
          y aprendizaje automático
        </p>
        <Image
          src={IA}
          alt="Inteligencia Artificial"
          width={150}
          height={132}
        />
      </div>
    </div>
    <div className="flex justify-center">
    
      <div className={`w-[379px] h-[150px] flex justify-start items-start gap-4 ${lexend.className}`}>
      <Image
          src={BlockChain}
          alt="Inteligencia Artificial"
          width={150}
          height={132}
        />
        <p className="text-sm text-slate-950 font-normal leading-snug">
        hasta la implementación de sistemas de{" "}
          <span className="text-blue-950 text-base font-bold">blockchain</span>{" "}
          para garantizar la seguridad y la integridad de los datos biológicos.
        </p>
        
      </div>
    </div>
    
    <div className="flex justify-center">
        <div className={`w-[379px] h-[150px] flex justify-center items-start gap-4 ${lexend.className}`}>
          <p className="text-sm text-slate-950 font-normal leading-snug">Estamos comprometidos a explorar nuevas fronteras y posibilidades en la intersección de la ciencia y la tecnología.</p>
        </div>
      </div>
  </div>
  )
}

export default Integracion
