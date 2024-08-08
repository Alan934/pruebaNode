import React from 'react'
import BannerServices2 from '@/components/BannerServices2'
import Pink from "@/app/assets/img/Pink.png"
import { user , document , requirement} from '@/app/assets/icons'
import HeroBanner from '@/components/HeroBanner/heroBanner'
import fondoAsistenciaIT from '@/app/assets/img/FondoAsistenciaIT.png'
import InfoDesplegableSection from '@/components/InfoDesplegable/infoDesplegableSection/infoDesplegableSection'
import MetodologiaSection from '@/components/Metodologia/MetodologiaSection/metodologiaSection'


export default function page() {
  type typelistBanner = {
    icon : any
    alt:string
    subtitle: string
    paragraph: string
  }
  const listBanner:typelistBanner[]  = [
    {
      icon:document,
      alt:"documentos",
      subtitle:"Documenta tus Sistemas",
      paragraph:"Mantén una documentación actualizada de tu infraestructura de TI."
    },
    {
      icon:requirement,
      alt:"prioridades",
      subtitle:"Establece Prioridades",
      paragraph:"Identifica los sistemas y aplicaciones críticas para tu negocio."
    },
    {
      icon:user,
      alt:"personal",
      subtitle:"Capacita a tu Personal",
      paragraph:"Asegúrate de que tu equipo esté bien entrenado en las mejores prácticas de TI."
    }
  ]
  return (
    <div>
    <HeroBanner
        image={fondoAsistenciaIT}
        subtitle='Soporte Técnico Especializado para tu Empresa'
        title="Asistencia IT"
        descripcion="En nuestra empresa, la Asistencia IT es fundamental para garantizar el funcionamiento óptimo de tus sistemas y redes. Ofrecemos soporte técnico y soluciones a medida para resolver los problemas tecnológicos que puedas enfrentar. Te ayudamos a mantener la continuidad de tu negocio con el mínimo de interrupciones."
      />
    <InfoDesplegableSection
     idSeccion={1}
    />
    <BannerServices2
    Fondo={Pink}
    title={"Tips para Optimizar tu Asistencia IT"}
    listBanner={listBanner}
    />
    <MetodologiaSection
      idSubCategoria={1}
    />
    </div>
  )
}