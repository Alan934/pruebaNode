import HeroBanner from '@/components/HeroBanner/heroBanner'
import fondoCiberseguridad from '@/app/assets/img/FondoCiberseguridad.png'
import InfoDesplegableSection from '@/components/InfoDesplegable/infoDesplegableSection/infoDesplegableSection'
import MetodologiaSection from '@/components/Metodologia/MetodologiaSection/metodologiaSection'
import BannerServices1 from '@/components/BannerServices1'
import Blue from "@/app/assets/img/Blue.png"
import { web , validate , copy} from '@/app/assets/icons'
const page = () => {
  type typelistBanner = {
    icon : any
    alt:string
    subtitle: string
    paragraph: string
  }
  const listBanner:typelistBanner[]  = [
    {
      icon:validate,
      alt:"validaciones",
      subtitle:"Evalúa Regularmente tus Sistemas",
      paragraph:"Realiza auditorías de seguridad periódicas para identificar y corregir vulnerabilidades."
    },
    {
      icon:web,
      alt:"actualización",
      subtitle:"Actualiza tu Software",
      paragraph:"Mantén todos tus sistemas y aplicaciones actualizados con los últimos parches de seguridad."
    },
    {
      icon:copy,
      alt:"respaldos",
      subtitle:"Respaldos Frecuentes",
      paragraph:"Realiza copias de seguridad regulares de tus datos críticos para evitar pérdidas."
    }
  ]
  return (
    <div>
      <HeroBanner
        image={fondoCiberseguridad}
        subtitle='Potencia tu Negocio en el Mundo Digital'
        title="Ciberseguridad"
        descripcion="En nuestra empresa, la ciberseguridad es una prioridad. Ofrecemos soluciones avanzadas para proteger tu infraestructura digital contra amenazas cibernéticas. Nos aseguramos que tus datos, sistemas y redes estén seguros, permitiendo que tu negocio opere con confianza y sin interrupciones."
      />

      <BannerServices1
        Fondo={Blue}
        title={"Tips para Fortalecer la Seguridad de tu Empresa"}
        listBanner={listBanner}
      />

      <InfoDesplegableSection
                idSeccion={3}
      />
      <MetodologiaSection
        idSubCategoria={1}
      />
    </div>
  )
}

export default page
