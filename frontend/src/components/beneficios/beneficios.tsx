import React from "react";
import { lexend } from "../../app/fonts";
import BeneficiosCard from "./beneficiosCard";

const Beneficios = () => {
  return (
    <section className="gap-48">
      <h2 className={`${lexend.className} font-bold ps-48`}>Beneficios</h2>
      <div className="flex justify-center items-baseline">
        <BeneficiosCard url='/img/Data privacy and security on laptop.svg' alt="laptop" text='Seguridad Mejorada'></BeneficiosCard>
        <BeneficiosCard url='/img/time.svg' alt='reloj de arena' text='Minimizar el tiempo de inactividad'></BeneficiosCard>
        <BeneficiosCard url='/img/dollar coin.svg' alt='moneda de dolar' text='Ahorro de costos'></BeneficiosCard>
        <BeneficiosCard url='/img/puzzle1.svg' alt='puzzle cerebro humano' text='Asesoramiento experto'></BeneficiosCard>
      </div>
    </section>
  );
};

export default Beneficios;
