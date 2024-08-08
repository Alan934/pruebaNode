'use client'
import { lexend } from "@/app/fonts"
import { useEffect, useState } from "react";

import {ListadoService} from "@/service/ListadoService"

const areasDeColaboracion = [
    "Genómica",
    "BioInformática",
    "Medicina personalizada"
];
interface Props {
  title: string;
  items: string[];
}


const Listado = () => {
  const [datos, setDatos] = useState<Props>();

    useEffect(() => {
        const fetchValores = async () => {
          try {
            const valores = await ListadoService.getData();
            setDatos(valores);  
            console.log(valores);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchValores();
        console.log(datos, "Datos")
      }, [datos]);

  return (
    <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
       <p className={`text-2xl font-semibold text-black mb-8 mx-8 tablet:mx-4 ${lexend.className}`}>
           {datos?.title}
        </p>
        <ul className="list-disc list-inside movil:mx-10 tablet:mx-8 laptopt:mx-6">
            {datos?.items.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
        </ul>
    </div>
  )
}

export default Listado
