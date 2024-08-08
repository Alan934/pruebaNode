import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type typelistBanner = {
  icon : any
  alt:string
  subtitle: string
  paragraph: string
}
interface HeroBannerProps { 
  Fondo : StaticImageData;
  title: string;
  listBanner:typelistBanner[]
}

const BannerServices1: React.FC<HeroBannerProps> = ({ Fondo, title , listBanner}) => {
  return (
    <div className="relative flex items-center justify-start w-full h-auto py-8">
      
      <Image
        src={Fondo}
        alt="fondo"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className=""
      />
        <div className="z-10 mx-9 movil:mx-10 tablet:mx-48">
          <h2 className="text-[#75F256] font-normal text-xl mb-5">{title}</h2>
          <div>
            {listBanner.map((list, index) =>(
              <div key={index} className='mb-3'>
                <div className='flex gap-1 mb-2'>
                  <Image src={list.icon} width={24} height={24} alt={list.alt}/>
                  <h3 className='text-white font-normal text-lg'>{list.subtitle}</h3>
                </div>
                <p className="text-white font-normal text-sm">{list.paragraph}</p>
              </div>
            ))}
          </div> 
        </div>
    </div>
  );
};

export default BannerServices1;
