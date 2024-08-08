import { lato, lexend } from "@/app/fonts";
import { useGetDataBannerByIdQuery } from "@/redux/services/bannerApi";
import React from "react";

interface props {
  id:number
}

 const Banner: React.FC<props> = ({id}) =>{
  const {data, error, isLoading} = useGetDataBannerByIdQuery(id);

  const scrollToForm = () => {
    const formElement = document.getElementById('contactForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if(isLoading) return <p>Cargando...</p>
  if(error) return <p>Error</p>
  if (!data) return <p>No hay datos disponibles.</p>;

  return (
    <div className="bg-gradient-to-r from-[#0A66C2] to-[#99C9B0]  flex justify-center py-12">
        <div className="text-center space-y-5">
            <h2 className={`${lexend.className} text-xl font-semibold leading-7 text-lime`}>{data.tituloBanner}</h2>
            {data.items.map(item => (
              <div key={item.id} className={`${lato.className} text-xl font-normal leading-7 text-white`}>
                  {item.tituloItem}
              </div>
            ))}
            <button
              onClick={scrollToForm}
              className="bg-darkBlue p-2 rounded-lg text-white shadow-lg self-stretch items-center hover:bg-blue-950 transition-colors">
              <div className={`text-zinc-100 text-base font-normal leading-[29.38px] ${lexend.className}`}>Solicita una consulta gratuita</div>
            </button>
        </div>
    </div>
  )

}
 export default Banner;