'use client'
import TeamSelection from "../TeamSelection/teamSelection";
import { useEffect, useState } from "react";

import { lexend } from "../../../app/fonts";
import { StaticImageData } from "next/image";

import {EquipoService} from '@/service/EquipoService'
import { useGetTeamQuery } from "@/redux/services/teamApi";

interface IntegranteData {
    image: string,
    nameIntegrante: string,
    rolIntegrante: string,
    gitHubURL: string,
    linkedinURL: string
}

interface TeamData {
    nameEquipo: string;
    integrantes: IntegranteData[];
  }

const TeamSection = () => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(0);
    const {data, error, isLoading, isFetching} = useGetTeamQuery(null)

    // const [datosTarjetas, setDatosTarjetas] = useState<TeamData[]>([]);

    // useEffect(() => {
    //     const fetchValores = async () => {
    //       try {
    //         const valores = await EquipoService.getData();
    //         setDatosTarjetas(valores);  
    //         console.log(valores);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    //     fetchValores();
    //     console.log(datosTarjetas, "Datos")
    //   }, []);

    const toggleEquipo = (index: number) => {
        if (index !== equipoSeleccionado) {
            setEquipoSeleccionado(index);
        }    
    };

    if(isLoading || isFetching) return <p>Cargando...</p>
    if(error) return <p>Error</p>

    return (
        <div className="max-w-2xl mx-auto my-8 rounded-lg tablet:max-w-5xl">
          <h1 className="text-xl font-bold mb-4 mx-8 tablet:mx-5">Conocé al equipo</h1>
          <div className="flex space-x-4 justify-center">
            {data?.map((equipo, index) => (
              <button
                key={index}
                className={`p-2 rounded-full gap-5 border-2 border-gray-200 w-36 h-14 flex content-center flex-wrap justify-center ${lexend.className} 
                  ${equipoSeleccionado === index 
                  ?  `text-blue-950 font-bold bg-gray-100` 
                  : `text-blue-950 font-medium`}`}
                onClick={() => toggleEquipo(index)}
              >
                {equipo.nameEquipo}
              </button>
            ))}
          </div>
          {data?.map((equipo, index) => (
            <div key={index} className={`${equipoSeleccionado === index ? 'block' : 'hidden'} mt-4`}>
              <TeamSelection equipo={equipo} />
            </div>
          ))}
        </div>
      );
  
}

export default TeamSection
