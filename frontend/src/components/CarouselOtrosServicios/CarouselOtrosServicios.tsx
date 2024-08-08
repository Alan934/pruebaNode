'use client'
import { useState, useEffect } from 'react';
import Card from '../te-ofrecemos/servicios/card';
import { lexend } from '@/app/fonts';
import { useGetDataSeccionCardByIdQuery } from '@/redux/services/teOfrecemosApi';

interface ItemData {
  id: number;
  tituloItem: string;
}

interface CardData {
  id: number;
  nombreCard: string;
  urlImagenCard: string;
  items: ItemData[];
}

interface SeccionCardData {
  id: number;
  tituloSeccionCard: string;
  cards: CardData[];
}

interface CarouselOtrosServiciosProps {
  id: number;
}

const CarouselOtrosServicios: React.FC<CarouselOtrosServiciosProps> = ({id}) => {
  const { data, error, isLoading, isFetching } = useGetDataSeccionCardByIdQuery(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Llamar al manejo de tamaño inicialmente

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (data?.cards.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.cards.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Cambia de card cada 2 segundos

      return () => clearInterval(interval);
    }
  }, [data?.cards.length]);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No se encontraron datos</p>;

  const visibleCards = () => {
    if (windowWidth >= 1024) {
      return 3; // Mostrar 3 tarjetas en pantallas grandes
    } else if (windowWidth >= 640) {
      return 2; // Mostrar 2 tarjetas en tablets
    } else {
      return 1; // Mostrar 1 tarjeta en móviles
    }
  };

  return (
    <div className="relative mb-12">
      <h2 className={`${lexend.className} font-bold text-xl text-black ml-9 mt-8 mb-4
        desktop:mt-10 
        desktop:ml-48`}>{data?.tituloSeccionCard}</h2>
      <div className="flex justify-center ml-6 ">
        <div className="overflow-hidden relative mb-9">
          <div
            className={`flex transition-transform duration-500 ease-out ${windowWidth >= 1024 ? '' : 'transform-gpu'}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards())}%)`,
              padding: windowWidth >= 1024 ? '0 60px' : '0',
            }}
          >
            {data?.cards.map((card) => (
              <div
                key={card.id}
                className={`shrink-0 ${
                  windowWidth >= 1024
                    ? 'w-[calc(28%-16px)]' // 3 tarjetas en desktop
                    : windowWidth >= 640
                    ? 'w-[calc(50%-0px)]' // 2 tarjetas en tablet
                    : 'w-full' // 1 tarjeta en móvil
                } mx-2`}
              >
                <Card
                  urlImagenCard={card.urlImagenCard}
                  nombreCard={card.nombreCard}
                  items={card.items.map((item) => item.tituloItem)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselOtrosServicios;

