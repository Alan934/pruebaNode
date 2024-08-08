import React from 'react'
import BannerServices1 from '@/components/BannerServices1'
import Blue from "@/app/assets/img/Blue.png"
import { user , objetives , simple} from '@/app/assets/icons'
import HeroBanner from '@/components/HeroBanner/heroBanner'
import fondoUxUi from '@/app/assets/img/FondoUxUi.png'
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
    icon:objetives,
    alt:"objetivos",
    subtitle:"Define tus Objetivos",
    paragraph:"Así el diseño podrá alinearse perfectamente con tus metas."
  },
  {
    icon:user,
    alt:"usuario",
    subtitle:"Conoce a tus Usuarios",
    paragraph:"Para poder crear un diseño que realmente satisfaga sus necesidades y expectativas."
  },
  {
    icon:simple,
    alt:"simplicidad",
    subtitle:"Mantén la Simplicidad",
    paragraph:"A veces, menos es más. Un diseño limpio y funcional suele ser más efectivo."
  }
]
  return (
    <div>
      <HeroBanner
        image={fondoUxUi}
        subtitle='Soluciones Digitales Personalizadas'
        title="Diseño UX/UI"
        descripcion="Nos dedicamos a crear interfaces intuitivas y atractivas, que mejoran la experiencia del usuario y facilitan la interacción con tus productos digitales. Nuestro enfoque centrado en el usuario asegura que cada proyecto no solo cumpla, sino que supere las expectativas de tus clientes."
      />
      <InfoDesplegableSection
        idSeccion={1}
      />
      <BannerServices1
       Fondo={Blue}
       title={"Tips antes de pedir presupuesto"}
       listBanner={listBanner}
      />
      
      <MetodologiaSection
         idSubCategoria={3}
      />

    </div>
  )
}
