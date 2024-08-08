'use client'
import OrangeButton from '@/components/OrangeButton/OrangeButton';
import CollaborationSection from '@/components/CollaborationSection/CollaborationSection';
import HeroBanner from '@/components/HeroBanner/heroBanner'
import fondoBioingenieria from "@/app/assets/img/FondoBioingenieria.png";
import Listado from '@/components/ListadoBioingenieria/listado';
import Integracion from '@/components/IntegracionBiotecnologia/integracion';
import InfoDesplegableSection from '@/components/InfoDesplegable/infoDesplegableSection/infoDesplegableSection';
import BannerBioingenieria from '@/components/BannerBioingenieria/BannerBioingenieria';

const page = () => {

  const scrollToForm = () => {
    const formElement = document.getElementById('contactForm'); // ID del formulario
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <HeroBanner
        image={fondoBioingenieria}
        subtitle='Soluciones Tecnológicas Innovadoras'
        title="Bioingeniería"
        descripcion="Ofrecemos soluciones innovadoras en el ámbito de la Biotecnología.  Nuestro departamento especializado aprovecha la convergencia entre ciencia y la tecnología para impulsar el progreso de la salud."
      />

      <div className="flex items-center justify-center">
      <OrangeButton text="Coordinemos una cita" onClick={scrollToForm}
      />
      </div>

      <Listado/>
      <InfoDesplegableSection
        idSeccion={4}
      />
      <Integracion/>
      <CollaborationSection/>
      <BannerBioingenieria/>
     </div>
  )
}

export default page
