'use client'

import { lexend } from "@/app/fonts";
import BotonDesplegable from "@/components/BotonDesplegable/botonDesplegable";
import { useRef, useState } from "react";

interface Item {
    tituloItem: string;
    subTituloItem: string;
    urlImagenItem?: string;
}

interface Props {
    title: string;
    items: Item[];
}

const InfoDesplegableComponent: React.FC<Props> = ({ title, items }) => {
    const [mostrarInfo, setMostrarInfo] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleMostrarInfo = () => {
        setMostrarInfo(!mostrarInfo);
    };

    return (
        <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
            <div className="flex items-center justify-between mx-8 tablet:mx-4">
                <p
                    className={`text-base font-normal text-black cursor-pointer ${lexend.className}`}
                    onClick={toggleMostrarInfo}
                >
                    {title}
                </p>
                <BotonDesplegable
                    onClick={toggleMostrarInfo}
                    mostrarInfo={mostrarInfo}
                />
            </div>

            <div
                ref={contentRef}
                className={`transition-height duration-300 ease-in-out overflow-hidden mx-8 tablet:mx-4`}
                style={{
                    height: mostrarInfo ? `${contentRef.current?.scrollHeight}px` : '0px',
                    opacity: mostrarInfo ? '1' : '0',
                }}
            >
                <div className={`w-auto mt-2 text-slate-950 movil:text-xs tablet:text-sm font-normal leading-none ${lexend.className}`}>
                    {items.length > 1 ? (
                        <ul className="list-disc pl-5">
                            {items.map((item, index) => (
                                <li key={index} className="mb-2">
                                    <strong>{item.tituloItem}:</strong> {item.subTituloItem}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{items[0].tituloItem}: {items[0].subTituloItem}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InfoDesplegableComponent;
