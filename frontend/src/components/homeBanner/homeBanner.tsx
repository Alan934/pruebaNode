
import Image from 'next/image';
import OrangeButton from '../OrangeButton/OrangeButton';

interface HomeBannerProps {
  id: number;
  urlImagenBanenrHero: string;
  tituloBannerHero: string;
  descripcionBannerHero: string;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ urlImagenBanenrHero, tituloBannerHero, descripcionBannerHero }) => {

  const scrollToForm = () => {
    const formElement = document.getElementById('contactForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative flex items-center justify-center w-[578] h-[763px] shrink-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient z-10"></div>
      <Image
        src={urlImagenBanenrHero}
        alt="fondo"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className="z-0 transform transition-transform duration-1000 ease-in-out scale-100 sm:scale-105 md:scale-110 lg:scale-115 xl:scale-120"
      />
      <div className=" flex flex-col items-start h-72 w-auto ml-9 z-20 mr-16 mb-72 mt-24 gap-4
      movil:mb-96
      movil:w-[670px]
      desktop:w-[599px]
      desktop:-ml-96
      desktop:mt-11
      desktop:mb-80">
          <h1 className="text-white font-lexend text-4xl font-bold w-full h-auto mb-4 align-stretch
          movil:-mt-16"
          >{tituloBannerHero}</h1>
          <p className="text-white font-lexend text-sm font-normal h-auto w-full mb-4
          movil:text-lg
          movil:mb-0"
          >{descripcionBannerHero}</p>
          <OrangeButton text="Contactar" onClick={scrollToForm} 
          />
        </div>
      </div>
  );
};

export default HomeBanner;
