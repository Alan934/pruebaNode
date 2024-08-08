import Image from 'next/image';
import { arrowCircleUp, arrowCircleDown } from '@/app/assets/icons/index';

interface Props {
  onClick: () => void;
  mostrarInfo: boolean;
}

const BotonDesplegable: React.FC<Props> = ({ onClick, mostrarInfo }) => {
  return (
    <button onClick={onClick}>
      <Image
        src={mostrarInfo ? arrowCircleUp : arrowCircleDown}
        alt="Icono flecha"
        width={25}
        height={24}
        layout="fixed"
      />
    </button>
  );
};

export default BotonDesplegable;
