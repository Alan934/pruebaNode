import React from 'react'
import ComoLoLogramosComponent from './../../components/comoLoLogramos/comoLoLogramosComponent';
import SectionValores from "@/components/NuestrosValores/SeccionValores/valoresSection"
import TeamSection from "@/components/TarjetasEquipo/TeamSection/teamSection";

import fondoAboutUs from "@/app/assets/img/FontoAboutUs.png";
import HeroBanner from '@/components/HeroBanner/heroBanner'

export default function About() {
  return (
    <div >
    <HeroBanner
        image={fondoAboutUs}
        title="Acerca de nosotros"
        descripcion="Diseñadores de software y tecnología con una visión mercantil y certera para el éxito. Contamos con asesoramiento integral desde el área legal, desarrollo de Software, comercialización y marketing.
                  Generamos un verdadero impulso para nuestros clientes. Conformamos un sólido y organizado equipo de trabajo capaz de resolver cualquier adversidad. Contamos con brillantes talentos con un amplio manejo en el negocio."
      />
        <TeamSection/>
        <SectionValores/>
      <ComoLoLogramosComponent/>
    </div>
  )
}
