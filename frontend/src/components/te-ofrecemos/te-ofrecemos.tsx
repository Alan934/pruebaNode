'use client'
import React, { useEffect } from 'react';
import { lexend } from '../../app/fonts';
import Servicios from './servicios/servicios'; 
import CarouselNuestrosProductos from './nuestros-productos/CarouselNuestrosProdutos';
import { useGetDataSeccionGeneralByIdQuery } from '@/redux/services/teOfrecemosApi';

interface ItemData {
  id: number;
  tituloItem: string;
}

interface CardData {
  id: number;
  urlImagenCard: string;
  tituloCard: string;
  items: ItemData[];
}

interface SeccionCard {
  id: number;
  tituloSeccionCard: string;
  cards: CardData[];
}

interface SeccionGeneral {
  id: number;
  idSeccionGeneral: number;
  tituloSeccionGeneral: string;
  seccionCards: SeccionCard[];
}

interface Props {
  id: number;
}

const TeOfrecemos: React.FC<Props> = ({ id }) => {
  const { data, error, isLoading, isFetching } = useGetDataSeccionGeneralByIdQuery(id);
  
  useEffect(() => {
    if (data) {
      console.log("Datos recibidos:", data);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, error]);

  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;
  if (!data || !Array.isArray(data.seccionCards)) return <p>No se encontraron datos.</p>;

  const primeraSeccionCard = data.seccionCards[0];
  const segundaSeccionCard = data.seccionCards[1];

  return (
    <section className="gap-48">
      <Servicios
        key={primeraSeccionCard.id}
        id={primeraSeccionCard.id}
        tituloSeccionCard={primeraSeccionCard.tituloSeccionCard}
        />
      <CarouselNuestrosProductos 
      key={segundaSeccionCard.id}
      id={segundaSeccionCard.id}
      tituloSeccionCard={segundaSeccionCard.tituloSeccionCard}
      cards={segundaSeccionCard.cards}
      />
    </section>
  );
};

export default TeOfrecemos;





