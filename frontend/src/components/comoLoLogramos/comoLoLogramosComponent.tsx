'use client'
import { useEffect, useState } from 'react';

import ComoLoLogramosCard from './comoLoLogramosCard/comoLoLogramosCard';
import BotonDesplegable from '@/components/BotonDesplegable/botonDesplegable';
import { lexend } from "@/app/fonts";
import { useGetDataBySeccionQuery } from '@/redux/services/desplegableApi';

interface Item {
    tituloItem: string;
    subTituloItem: string;
    urlImagenItem?: string;
}

interface Desplegable {
    TextoDesplegable: string;
    items: Item[];
}

interface SeccionDesplegable {
    IdSeccionDesplegable: number;
    nombreSeccionDesplegable: string;
    Desplegables: Desplegable[];
}


const ComoLoLogramosComponent = () => {
    const [mostrarTarjetas, setMostrarTarjetas] = useState(true);
    const { data, error, isLoading } = useGetDataBySeccionQuery(2); 

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error</p>;

    const toggleMostrarTarjetas = () => {
        setMostrarTarjetas(!mostrarTarjetas);
    };

    return (
        <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
            {data && (
                <>
                    <p className={`text-2xl font-semibold text-black mb-8 mx-8 tablet:mx-4 ${lexend.className}`}>
                        {data.nombreSeccionDesplegable} 
                    </p>
                    {data.desplegables.map((desplegable, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mx-8 tablet:mx-4">
                                <p
                                    className={`text-xl font-normal text-black cursor-pointer ${lexend.className}`}
                                    onClick={() => toggleMostrarTarjetas()}
                                >
                                    {desplegable.textoDesplegable}
                                </p>
                                <BotonDesplegable
                                    onClick={() => toggleMostrarTarjetas()}
                                    mostrarInfo={mostrarTarjetas}
                                />
                            </div>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden mx-8 tablet:mx-4 ${mostrarTarjetas
                                    ? 'max-h-[1000px] opacity-100'
                                    : 'max-h-0 opacity-0'
                                }`}
                            >
                                {desplegable.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="my-4">
                                        <ComoLoLogramosCard 
                                            title={item.tituloItem} 
                                            descripcion={item.subTituloItem} 
                                            url={item.urlImagenItem} 
                                        />
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

export default ComoLoLogramosComponent;
