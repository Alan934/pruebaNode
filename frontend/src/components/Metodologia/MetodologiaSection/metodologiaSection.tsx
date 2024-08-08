'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import {MetodologiaService} from "@/service/MetodologiaService"
import MetodologiaComponent from "../MetodologiaComponent/metodologiaComponent";
import { metodologiaConector} from '@/app/assets/icons/index';

import { inter, lexend } from "@/app/fonts";
import { useGetMetodologiaBySubCategoriaQuery } from "@/redux/services/metodologiaApi";

interface Props {
  idSubCategoria:number
}

const MetodologiaSection: React.FC<Props> = ({idSubCategoria}) => {
   
    const {data, error, isLoading, isFetching} = useGetMetodologiaBySubCategoriaQuery(idSubCategoria)

    if(isLoading || isFetching) return <p>Cargando...</p>
    if(error) return <p>Error</p>
    

      return (
        <div className="max-w-2xl mx-auto my-8 tablet:max-w-5xl">
          <p className={`text-2xl font-semibold text-black cursor-pointer mb-4 mx-8 tablet:mx-4 ${lexend.className}`}>
            Metodología de trabajo
          </p>
          <div className="flex flex-col items-center w-full ">
          {data?.map((item, index) => (
                    <div key={index} className="w-full flex flex-col items-center">
                        <MetodologiaComponent title={item.title} items={item.items} />
                        {index !== data?.length - 1 && (
                            <div className="connector">
                                <Image src={metodologiaConector} alt="Conector" width={5} height={12} />
                            </div>
                        )}
                    </div>
                ))}
          </div>
          <style jsx>{`
            .connector {
              margin-right: 28.5rem;
            }
    
            @media (max-width: 767px) {
              .connector {
                margin-left: 13.8rem;
              }
            }
    
            @media (min-width: 768px) and (max-width: 1023px) {
              .connector {
                margin-right: 38.5rem;
              }
            }
          `}</style>
        </div>
      );
}

export default MetodologiaSection