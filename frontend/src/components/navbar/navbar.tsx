"use client"
import { Logo, Burger, arrow , cross , home ,services , product , about , question ,arrowLeft} from '@/app/assets/icons/index';
import Image from 'next/image';
import React, { useState} from 'react';
import Link from 'next/link';

const Navbar = () => {
  
  const listServices = ["Diseño UX/UI", "Bioingeniería", "Desarrollo de Software", "Ciberseguridad", "Marketing Digital", "Asistencia IT"];
  const listProducts = ["ChatBot", "Central de Turnos", "Shopper", "Recetas Online"];
  
  const [menuServices, setMenuServices] = useState(false);
  const [menuProducts, setMenuProducts] = useState(false);
  const [isSideMenuOpen , setIsSideMenuOpen] = useState(false)
  const [isServicesOpen , setIsServicesOpen] = useState(false)
  const [isProductsOpen , setIsProductsOpen] = useState(false)

  return (
    <nav className="tablet:w-full items-center flex justify-between mt-8">
      <div className="flex items-center ml-10 w-44 justify-between tablet:w-auto">
        <div className="tablet:invisible">
          <Image src={Burger} alt="menu hamburguesa" width={24} height={24} onClick={() => setIsSideMenuOpen(true)}/>
        </div>
        <div className="cursor-pointer">
          <Link href="/">
            <Image  src={Logo} alt="logo rst" width={24} height={24} />
          </Link>
        </div>
      </div>
    {isSideMenuOpen &&
      <div className='fixed h-full w-screen tablet:hidden bg-black/50  top-0 right-0'>
        <section className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-72 flex '>
          <div className='flex justify-between'>
            <Image src={Logo} alt='cruz' width={24} height={24}></Image>
            <Image src={cross} alt='cruz' width={24} height={24}onClick={() => setIsSideMenuOpen(false)}></Image>
          </div>
          
          {isServicesOpen ? 
          <div className='space-y-4'>
            <Image src={arrowLeft} alt='flecha'onClick={() => setIsServicesOpen(false)}/>
            <div className='flex gap-1'>
              <Image src={services} alt={"Home"} width={28} height={28}/>
              <p className='font-bold text-2xl'>{"Servicios"}</p>
            </div>
            <div>
              {listServices.map(services => (
                <li className="p-2 text-sm list-none" key={services}>
                  <Link href="#">{services}</Link>
                </li>
              ))}
            </div>
          </div>
          :
           isProductsOpen ?
            <div className='space-y-4'>
              <Image src={arrowLeft} alt='flecha'onClick={() => setIsProductsOpen(false)}/>

              <div className='flex gap-1'>
                <Image src={product} alt={"Productos"} width={28} height={28}/>
                <p className='font-bold text-2xl'>{"Productos"}</p>
              </div>
              <div>
                {listProducts.map(product => (
                  <li className="p-2 text-sm list-none" key={product}>
                    <Link href="#">{product}</Link>
                  </li>
                ))}
              </div>
          </div>

          :
          <div className='space-y-5'>
            <div className='flex gap-1'>
              <Image src={home} alt={"Home"} width={24} height={24}/>
              <Link href={"home"}><p>{"Inicio"}</p></Link>
            </div>
            <div className='flex gap-1' onClick={() => setIsServicesOpen(true)}>
              <Image src={services} alt={"Servicios"} width={24} height={24}/>
              <p>{"Servicios"}</p>
            </div>
            <div className='flex gap-1' onClick={() => setIsProductsOpen(true)}>
              <Image src={product} alt={"Productos"} width={24} height={24}/>
              <p>{"Productos"}</p>
            </div>
            <div className='flex gap-1'>
              <Image src={about} alt={"Nosotros"} width={24} height={24}/>
              <Link href={"about"}><p>{"Acerca de Nosotros"}</p></Link>
            </div>
            <div className='flex gap-1'>
              <Image src={question} alt={"Preguntas"} width={24} height={24}/>
              <Link href={"frequentquestions"}><p>{"Preguntas Frequentes"}</p></Link>
            </div> 
          </div>
        }
        </section>
      </div>
    }

      <div>
        <ul className="mr-10 flex space-x-6">
          <div className='hidden tablet:flex items-center space-x-6 '>
            <Link href="/">
              <li className="hover:bg-gray-50 p-2 rounded-md">Inicio</li>
            </Link>

            <li
              className="relative"
              onMouseOver={() => setMenuServices(true)}
              onMouseOut={() => setMenuServices(false)}
            >
              <div className="flex cursor-pointer gap-2" >
                <Link href="#">Servicios</Link>
                <Image src={arrow} alt="arrow icon" width={25} height={24} />
              </div>

              {menuServices && (
                <div className="absolute w-max bg-white shadow-lg rounded-md" >
                  <ul className="space-y-2 block p-2 rounded-b-xl rounded-e-xl">
                    {listServices.map(services => (
                      <li className="hover:bg-gray-50 p-1 w-full text-sm" key={services}>
                        <Link href="#">{services}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li
              className="relative"
              onMouseOver={() => setMenuProducts(true)}
              onMouseOut={() => setMenuProducts(false)}
            >
              <div className='flex cursor-pointer gap-2' >
                <Link href="#">Productos</Link>
                <Image src={arrow} alt="arrow icon" width={25} height={24} />
              </div>

              {menuProducts && (
                <div className="absolute w-max bg-white shadow-lg rounded-md">
                  <ul className="space-y-2 p-2 block rounded-b-xl rounded-e-xl">
                    {listProducts.map(products => (
                      <li className="hover:bg-gray-50 rounded-md text-sm p-1 w-full" key={products}>
                        <Link href="#">{products}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <Link href="about">
              <li className="cursor-pointer hover:bg-gray-50 p-2 rounded-md">Acerca de Nosotros</li>
            </Link>

            <Link href="frequentquestions">
              <li className="cursor-pointer hover:bg-gray-50 p-2 rounded-md">Preguntas Frecuentes</li>
            </Link>
          </div>
          <Link href="#">
            <button className=" bg-[#071952] p-2 rounded-lg text-white shadow-lg self-stretch items-center">
              <span className="hidden tablet:inline">Contactar</span>
              <span className="inline tablet:hidden">Contáctanos</span>

            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
