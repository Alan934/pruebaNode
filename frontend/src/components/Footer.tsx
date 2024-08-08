"use client"
import { services, whatsapp } from "@/app/assets/icons"
import Image from "next/image"
import { instagram } from "@/app/assets/icons"
import { facebook } from "@/app/assets/icons"
import { linkedin } from "@/app/assets/icons"
import Link from "next/link"
import MapWrapper from "./MapWrapper"
import { useState } from "react"

export default function Footer() {
    const [openListServices , setOpenListServices]=useState(false)
    const [openListProducts , setOpenListProducts]=useState(false)

    const listServices = [
        {
          name:"Diseño UX/UI",
          href : "diseno-ux-ui"
        },
        {
          name:"Bioingeniería",
            href : "bioingenieria"
        },
        {
          name:"Desarrollo de Software",
            href : "desarrollo-de-software"
        },
        {
          name :"Ciberseguridad",
            href : "ciberseguridad"
        },
        {
          name:"Marketing Digital",
            href :"marketing-digital"
        },
        {
          name:"Asistencia IT",
            href : "asistencia-it"
        },
      ];
    const legal = ["Política de Privacidad" , "Terminos y Condiciones"]

    const contact = [
    {
        name : "+54",
        icon : whatsapp,
        alt : "WhatsApp"
    },
    {
        name : "Instagram",
        icon : instagram,
        alt : "Instagram"
    },
    {
        name : "Facebook",
        icon : facebook,
        alt : "Facebook"
    },
    {
        name : "Linkedin",
        icon : linkedin,
        alt : "Linkedin"
    }

    ];
    const listProducts = ["ChatBot", "Central de Turnos", "Shopper", "Recetas Online"];
   
  return (

    <div className="flex justify-center bg-[#E6E4E1] px-9">
        
        <div className="grid grid-cols-2 tablet:grid-cols-4 movil:grid-cols-3 w-[1024px] mx-auto mb-5">

            <div className="hidden movil:flex flex-col gap-6">
                <h3 className="font-normal text-xl">Empresa</h3>
                <div className="flex flex-col gap-4">
                    <Link href="/" onClick={()=>{setOpenListServices(false), setOpenListProducts(false)}}>Inicio</Link>
                    <p className="cursor-pointer" onClick={()=>{setOpenListServices(!openListServices),setOpenListProducts(false)}}>Servicios</p>
                    {openListServices && listServices.map((services ,index )=> (
                        
                        <Link className="text-darkBlue text-xs font-bold" href={services.href} key={index} onClick={()=>setOpenListServices(!openListServices)}>{services.name}</Link>
                        
                    ))}
                    <p className="cursor-pointer" onClick={()=>{setOpenListProducts(!openListProducts), setOpenListServices(false)}}>Productos</p>
                    {openListProducts && listProducts.map((product ,index )=> (
                        
                        <Link className=" text-darkBlue text-xs font-bold" href="#" key={index} onClick={()=>setOpenListProducts(!openListProducts)}>{product}</Link>
                        
                    ))}
                    <Link href="about"  onClick={()=>{setOpenListServices(false), setOpenListProducts(false)}}>Acerca de Nosotros</Link>
                    <Link href="frequentquestions"  onClick={()=>{setOpenListServices(false), setOpenListProducts(false)}}>Preguntas Frecuentes</Link>
                </div> 
            </div>
            <div className="hidden movil:flex flex-col gap-6">
                <h3 className="font-normal text-xl">Legales</h3>
                <div className="flex flex-col gap-4">
                    {legal.map(legal =>(
                        <p key={legal}>{legal}</p>
                    ))}
                </div> 
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="font-normal text-xl">Contacto</h3>
                <div className="flex flex-col gap-4">
                    {contact.map((contact ,index ) =>( 
                        <div className="flex gap-2" key={index}>
                            <Image src={contact.icon} alt={contact.alt} width={24} height={24}/>
                            <p>{contact.name}</p>
                        </div> 
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-6 movil:mt-8 tablet:mt-0">
                <h3 className="font-normal text-xl">Ubicación</h3>
                <p>Jujuy, Videla Castillo 498 y, <br /> M5500 Ciudad, Mendoza</p>
                <MapWrapper/>
            </div>
        </div>
    </div>
   
  )
}

