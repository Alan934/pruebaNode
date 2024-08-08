import HeroBanner from '@/components/HeroBanner/heroBanner'
import fondoMarketing from '@/app/assets/img/FondoMarketing.png'
import InfoDesplegableSection from '@/components/InfoDesplegable/infoDesplegableSection/infoDesplegableSection'
import MetodologiaSection from '@/components/Metodologia/MetodologiaSection/metodologiaSection'
import { objetives , user , web} from '@/app/assets/icons'
import BannerServices2 from '@/components/BannerServices2'
import Pink from "@/app/assets/img/Pink.png"
const page = () => {
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
      subtitle:"Define tus Objetivos ",
      paragraph:"Establece metas claras y alcanzables para guiar tu estrategia de marketing."
    },
    {
      icon:user,
      alt:"audiencia",
      subtitle:"Conoce a tu audiencia",
      paragraph:"Para poder crear un diseño que realmente satisfaga sus necesidades y expectativas."
    },
    {
      icon:web,
      alt:"sitio web",
      subtitle:"Optimiza tu Sitio Web",
      paragraph:"Asegúrate de que tu sitio web esté optimizado para SEO y tenga una excelente experiencia de usuario."
    }
  ]
  return (

    <div>
       <HeroBanner
        image={fondoMarketing}
        subtitle='Protege tus Activos Digitales'
        title="Marketing Digital"
        descripcion="En nuestra empresa, la ciberseguridad es una prioridad. Ofrecemos soluciones avanzadas para proteger tu infraestructura digital contra amenazas cibernéticas. Nos aseguramos que tus datos, sistemas y redes estén seguros, permitiendo que tu negocio opere con confianza y sin interrupciones."
      />

      <InfoDesplegableSection
        idSeccion={1}
      />

        <BannerServices2
        Fondo={Pink}
        title={"Tips para Maximizar tu Estrategia de Marketing Digital"}
        listBanner={listBanner}
        />

      <MetodologiaSection
        idSubCategoria={1}
      />
    </div>
  )
}

export default page
