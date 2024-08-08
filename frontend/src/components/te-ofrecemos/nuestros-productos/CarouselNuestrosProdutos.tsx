'use client'
import { useState, useEffect, use } from 'react';
import CardNuestrosPrtoductos from './CardNuestrosProductos';
import { lexend } from '@/app/fonts';
import { useGetDataSeccionCardByIdQuery } from '@/redux/services/teOfrecemosApi';

interface ItemData {
  id: number,
  tituloItem: string
}

interface Card {
  id: number,
  nombreCard: string,
  urlImagenCard: string,
  items: ItemData[]
}

interface SeccionCard {
  id: number,
  tituloSeccionCard: string,
  cards: Card[]
}

interface NuestrosProductosProps {
  id: number;
  tituloSeccionCard: string;
  cards: Card[]
}

const CarouselNuestrosProductos: React.FC<NuestrosProductosProps> = ({ id, tituloSeccionCard, cards }) => {
  const { data, error, isLoading, isFetching } = useGetDataSeccionCardByIdQuery(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsPaused(true); // Detener la animación en desktop y laptop
      } else {
        setIsPaused(false); // Permitir la animación en móvil y tablet
      }
    };

    handleResize(); // Llamar al manejo de tamaño inicialmente

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && windowWidth < 1024) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Cambia de card cada 3 segundos
    }
    return () => clearInterval(interval);
  }, [isPaused, windowWidth, cards.length]);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No se encontraron datos</p>;

  const visibleCards = () => {
    if (windowWidth >= 1024) {
      return Math.min(cards.length, Math.floor(windowWidth / 300));
    } else if (windowWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (windowWidth < 1024) {
      setIsPaused(false);
    }
  };

  return (
    <div className="relative mb-12">
      <h2 className={`${lexend.className} font-bold text-xl text-black ml-9 mt-8 mb-4
        desktop:mt-10 
        desktop:ml-48`}>{data.tituloSeccionCard}</h2>
      <div className="flex justify-center ml-14 laptop:ml-0 desktop:ml-0">
        <div
          className="overflow-hidden relative mb-9"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(windowWidth >= 1024)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex transition-transform duration-500 ease-out ${windowWidth >= 1024 ? '' : 'transform-gpu'}`}
            style={{
              transform: windowWidth >= 1024 ? 'none' : `translateX(-${currentIndex * (100 / visibleCards())}%)`,
              padding: windowWidth >= 1024 ? '0 60px' : '0',
            }}
          >
            {data.cards.map(card => (
              <div
                key={card.id}
                className={`shrink-0 ${windowWidth >= 1024 ? 'w-[calc(28%-16px)]' : windowWidth >= 640 ? 'w-[calc(50%-0px)]' : 'w-full'}`}
              >
                <CardNuestrosPrtoductos
                urlImagenCard={card.urlImagenCard}
                nombreCard={card.nombreCard}
                items={card.items.map(item => item.tituloItem)}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselNuestrosProductos;





