'use client';

import React, { useEffect } from "react";
import { lexend } from "@/app/fonts";
import Card from "./card";
import { useGetDataSeccionCardByIdQuery } from "@/redux/services/teOfrecemosApi";

interface ItemData {
  id: number,
  tituloItem: string
}

interface CardData {
  id: number,
  nombreCard: string,
  urlImagenCard: string,
  items: ItemData[]
}

interface SeccionCard {
  id: number,
  tituloSeccionCard: string,
  cards: CardData[]
}

interface ServiciosProps {
  id: number;
  tituloSeccionCard: string;
}

const Servicios: React.FC<ServiciosProps> = ({ id, tituloSeccionCard }) => {
  const { data, error, isLoading, isFetching } = useGetDataSeccionCardByIdQuery(id);


  if (isLoading || isFetching) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No se encontraron datos</p>;

  const { cards } = data;
  
  return (
    <section className="mb-12">
      <h2 className={`${lexend.className} font-bold text-xl text-black ml-9 mt-8 mb-4
        desktop:mt-10 
        desktop:ml-48`}>{tituloSeccionCard}</h2>
      <div className="flex justify-center mx-8 laptop:mx-36 desktop:mx-36">
        <div className="grid grid-cols-1 gap-4 mx-auto px-4 w-full max-w-screen-xl gap-x-4
        tablet:grid-cols-2 tablet:gap-4 tablet:px-4
        laptop:grid-cols-3 laptop:gap-5 laptop:px-5 laptop:gap-x-5
        desktop:grid-cols-3 desktop:gap-5 desktop:px-5 desktop:gap-x-5">
          {cards.map(card => (
              <div key={card.id} className="flex justify-center">
                <Card
                urlImagenCard={card.urlImagenCard}
                nombreCard={card.nombreCard}
                items={card.items.map(item => item.tituloItem)}
              />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;
