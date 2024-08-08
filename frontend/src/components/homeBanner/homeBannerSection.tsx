'use client'
import { homedir } from "os"
import HomeBanner from "./homeBanner"
import {useGetDataHomeBannerByIdQuery} from '@/redux/services/bannerHomeApi'
import HeroBanner from "../HeroBanner/heroBanner"

interface Props {
    id: number
  }

  const HomeBannerSection: React.FC<Props>  = ({id}) => {

    const {data, error, isLoading, isFetching} = useGetDataHomeBannerByIdQuery(id)

    if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) {
    console.error('Error:', error);
    return <p>Error</p>;
  }
  if (!data) {
    console.warn('No data found');
    return <p>No se encontraron datos.</p>;
  }
    
  return (
    <div>
        <div key={data.id}>
          <HomeBanner 
          urlImagenBanenrHero={data.urlImagenBannerHero} 
          tituloBannerHero={data.tituloBannerHero} 
          descripcionBannerHero={data.descripcionBannerHero} 
          id={data.id}/>
        </div>
    </div>
  )
}

export default HomeBannerSection