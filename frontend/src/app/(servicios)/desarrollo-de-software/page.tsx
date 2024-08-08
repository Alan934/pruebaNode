import HeroBanner from '@/components/HeroBanner/heroBanner'
import BannerServices1 from '@/components/BannerServices1'
import React from 'react'
import Blue from "@/app/assets/img/Blue.png"
import { requirement , user} from '@/app/assets/icons'

import InfoDesplegableSection from '@/components/InfoDesplegable/infoDesplegableSection/infoDesplegableSection'
import fondoDDS from "@/app/assets/img/FondoDDS.png";
import MetodologiaSection from '@/components/Metodologia/MetodologiaSection/metodologiaSection';


export default function page() {

  type typelistBanner = {
    icon : any
    alt:string
    subtitle: string
    paragraph: string
  }

  const listBanner:typelistBanner[]  = [
  {
    icon:requirement,
    alt:"requerimientos",
    subtitle:"Define los Requisitos del Proyecto",
    paragraph:"Especificar detalladamente las funcionalidades necesarias asegura un presupuesto preciso y evita sorpresas durante el desarrollo."
  },
  {
    icon:user,
    alt:"usuario",
    subtitle:"Identificar a los Usuarios Finales",
    paragraph:"Para poder crear un diseño que realmente satisfaga sus necesidades y expectativas."
  }
]
  return (
    <>
      <HeroBanner
        image={fondoDDS}
        subtitle='Soluciones Digitales Personalizadas'
        title="Desarrollo de software"
        descripcion="Nos especializamos en servicios de desarrollo de software de extremo a extremo, brindando soluciones innovadoras a desafíos complejos. Nuestro equipo de desarrolladores y diseñadores colabora estrechamente con los clientes para transformar ideas en productos de software potentes y escalables."
      />
      <InfoDesplegableSection
        idSeccion={3}
      />
      <BannerServices1
        Fondo={Blue}
        title={"Tips antes de pedir presupuesto"}
        listBanner={listBanner}
      />   
            
      <MetodologiaSection
        idSubCategoria={2}
      />

       </>
  )
}
