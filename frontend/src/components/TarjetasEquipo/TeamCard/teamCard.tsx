import Image, { StaticImageData } from "next/image"
import { git, linkedin } from '@/app/assets/icons/index';
import { lexend } from "../../../app/fonts";


interface IntegranteData {
    image: string,
    nameIntegrante: string,
    rolIntegrante: string,
    gitHubURL: string,
    linkedinURL: string
}

interface TeamCardProps {
  integrante: IntegranteData;
}

const TeamCard: React.FC<TeamCardProps> = ({ integrante }) => {
  return (
    <div className="relative m-2 p-2 border rounded-lg w-36 h-48 flex flex-col items-center">
      <div className="flex flex-col items-center flex-grow">
        <Image
          className="rounded-full"
          src={integrante.image}
          alt={integrante.nameIntegrante}
          width={90}
          height={90}
        />
          <p className={`${lexend.className} text-sm font-semibold text-center`}>{integrante.nameIntegrante}</p>
      </div>
          <div className=" absolute bottom-3/4 top-2/3 mt-2 flex items-center justify-center">
            <p className={`${lexend.className} text-xs font-normal text-center`}>{integrante.rolIntegrante}</p>
        </div>
      <div className="absolute bottom-0 top-36 p-2 flex justify-center space-x-2 mt-auto mb-2">
        <a href={integrante.gitHubURL} target="_blank" rel="noopener noreferrer">
          <Image src={git} width={32} height={32} alt="Git" />
        </a>
        <a href={integrante.linkedinURL} target="_blank" rel="noopener noreferrer">
          <Image src={linkedin} width={32} height={32} alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
}

export default TeamCard;
