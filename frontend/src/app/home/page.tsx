'use client'
import Banner from "@/components/Banner"
import { lexend } from "../fonts"
import MetodologiaSection from "@/components/Metodologia/MetodologiaSection/metodologiaSection";
import { useGetDataSubCategoriaByIdQuery } from "@/redux/services/subCategoriaApi";
import HomeBannerSection from "@/components/homeBanner/homeBannerSection";
import TeOfrecemos from "@/components/te-ofrecemos/te-ofrecemos";
import CarouselOtrosServicios from "@/components/CarouselOtrosServicios/CarouselOtrosServicios";


export default function Page() {
  const {data, error, isLoading} = useGetDataSubCategoriaByIdQuery(11);

  
  if(isLoading) return <p>Cargando...</p>
  if(error) return <p>Error</p>
  if (!data) return <p>No hay datos disponibles.</p>;
   
  return ( 
    <div className={`${lexend}`}>
      {data.bannerheros.map(homeBanner=>(
        <div key={homeBanner.id}>
           <HomeBannerSection id={homeBanner.id}/>
        </div>
      ))}
      {data.seccionGenerals.map(seccionGeneral=>(
        <div key={seccionGeneral.id}>
          <h2 className={`${lexend.className} font-bold text-2xl text-black ml-9 mt-8 desktop:mt-10 desktop:ml-48`}>
            {seccionGeneral.tituloSeccionGeneral}
          </h2>
          {<TeOfrecemos id={seccionGeneral.id} />}
        </div>
      ))}
      {data.banners.map(banner=>(
        <div key={banner.id}>
          {<Banner id={banner.id}/>}
        </div>
      ))}
      <CarouselOtrosServicios id={3}/>
      <MetodologiaSection idSubCategoria={1} />
    </div>
  );
}