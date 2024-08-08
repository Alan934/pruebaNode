'use client'
import { useState } from 'react';

import ValoresCard from '../TarjetaValores/valoresCard'; 
import BotonDesplegable from '@/components/BotonDesplegable/botonDesplegable';
import { lexend } from "../../../app/fonts";
import { useGetDataBySeccionQuery } from '@/redux/services/desplegableApi';

interface Item {
    tituloItem: string;
    subTituloItem: string;
  }
const SectionValores = () => {
    const [mostrarTarjetas, setMostrarTarjetas] = useState(true);

    const { data, error, isLoading } = useGetDataBySeccionQuery(1);

    if(isLoading ) return <p>Cargando...</p>
    if(error) return <p>Error</p>
    

    const toggleMostrarTarjetas = () => {
        setMostrarTarjetas(!mostrarTarjetas);
    };

    return (
        <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
            {data && (
                <>
                    {data.desplegables.map((desplegable, index) => (
                        <div key={index}>
                            <p className={`text-2xl font-semibold text-black cursor-pointer mb-8 mx-8 tablet:mx-4 ${lexend.className}`}>
                                {data.nombreSeccionDesplegable}

                            </p>
                            <div className="flex items-center justify-between mx-8 tablet:mx-4">
                                <p
                                    className={`text-xl font-normal text-black cursor-pointer ${lexend.className}`}
                                    onClick={toggleMostrarTarjetas}
                                >
                                {desplegable.textoDesplegable}
                                </p>
                                <BotonDesplegable
                                    onClick={toggleMostrarTarjetas}
                                    mostrarInfo={mostrarTarjetas}
                                />
                            </div>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden mx-8 tablet:mx-4 ${mostrarTarjetas
                                    ? 'max-h-[1000px] opacity-100'
                                    : 'max-h-0 opacity-0'
                                }`}
                            >
                                {desplegable.items.map((item: Item, itemIndex: number) => (
                                    <div key={itemIndex} className="my-4">
                                        <ValoresCard title={item.tituloItem} descripcion={item.subTituloItem} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default SectionValores;
