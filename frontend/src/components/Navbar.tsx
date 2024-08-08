"use client";
import { logorst, Burger, arrow, cross, home, services, product, about, question, arrowLeft } from '@/app/assets/icons/index';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('contactForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const listServices = [
    { name: "Diseño UX/UI", href: "diseno-ux-ui" },
    { name: "Bioingeniería", href: "bioingenieria" },
    { name: "Desarrollo de Software", href: "desarrollo-de-software" },
    { name: "Ciberseguridad", href: "ciberseguridad" },
    { name: "Marketing Digital", href: "marketing-digital" },
    { name: "Asistencia IT", href: "asistencia-it" },
  ];

  const listProducts = ["ChatBot", "Central de Turnos", "Shopper", "Recetas Online"];

  const [menuServices, setMenuServices] = useState(false);
  const [menuProducts, setMenuProducts] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

 

  const pathname = usePathname(); 

  return (
    <nav className="tablet:w-full items-center flex justify-between pt-8 pb-2 bg-[#F0F0F0] shadow-xl z-50 relative">
      <div className="flex items-center ml-10 w-44 justify-between tablet:w-auto">
        <div className="tablet:invisible">
          <Image src={Burger} alt="menu hamburguesa" width={24} height={24} onClick={() => setIsSideMenuOpen(true)} />
        </div>
        <div className="cursor-pointer">
          <Link href="/">
            <Image src={logorst} alt="logo rst" className='w-[67.878px] h-[24px] tablet:w-[104px] tablet:h-[40.736px]' />
          </Link>
        </div>
      </div>
      {isSideMenuOpen &&
        <div className='fixed h-full w-screen tablet:hidden bg-black/50 top-0 right-0'>
          <section className='text-black bg-[#F0F0F0] flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-72 flex'>
            <div className='flex justify-between'>
              <Image src={logorst} alt='cruz' width={80} height={40}></Image>
              <Image src={cross} alt='cruz' width={24} height={24} onClick={() => { setIsSideMenuOpen(false), setIsServicesOpen(false) }}></Image>
            </div>

            {isServicesOpen ?
              <div className='space-y-4'>
                <Image src={arrowLeft} alt='flecha' onClick={() => setIsServicesOpen(false)} />
                <div className='flex gap-1'>
                  <Image src={services} alt={"Home"} width={28} height={28} />
                  <p className='font-bold text-2xl'>{"Servicios"}</p>
                </div>
                <div>
                  {listServices.map((Services, index) => (
                    <li className="p-2 text-sm list-none" key={index} onClick={() => { setIsSideMenuOpen(false), setIsServicesOpen(false) }}>
                      <Link href={Services.href}>{Services.name}</Link>
                    </li>
                  ))}
                </div>
              </div>
              :
              isProductsOpen ?
                <div className='space-y-4'>
                  <Image src={arrowLeft} alt='flecha' onClick={() => setIsProductsOpen(false)} />
                  <div className='flex gap-1'>
                    <Image src={product} alt={"Productos"} width={28} height={28} />
                    <p className='font-bold text-2xl'>{"Productos"}</p>
                  </div>
                  <div>
                    {listProducts.map((product, index) => (
                      <li className="p-2 text-sm list-none" key={index}>
                        <Link href="#">{product}</Link>
                      </li>
                    ))}
                  </div>
                </div>
                :
                <div className='space-y-5'>
                  <div className='flex gap-1'>
                    <Image src={home} alt={"Home"} width={24} height={24} />
                    <Link href={"home"}><p>{"Inicio"}</p></Link>
                  </div>
                  <div className='flex gap-1' onClick={() => setIsServicesOpen(true)}>
                    <Image src={services} alt={"Servicios"} width={24} height={24} />
                    <p>{"Servicios"}</p>
                  </div>
                  <div className='flex gap-1' onClick={() => setIsProductsOpen(true)}>
                    <Image src={product} alt={"Productos"} width={24} height={24} />
                    <p>{"Productos"}</p>
                  </div>
                  <div className='flex gap-1'>
                    <Image src={about} alt={"Nosotros"} width={24} height={24} />
                    <Link href={"about"}><p>{"Acerca de Nosotros"}</p></Link>
                  </div>
                  <div className='flex gap-1'>
                    <Image src={question} alt={"Preguntas"} width={24} height={24} />
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
            {pathname === "/" ?
              <Link href="/">
                <li className="bg-slate-300 text-black p-2 rounded-md">Inicio</li>
              </Link>
              :
              <Link href="/">
                <li className="hover:bg-slate-200 text-[#373737] p-2 rounded-md">Inicio</li>
              </Link>
            }

            <li
              className="relative"
              onMouseOver={() => setMenuServices(true)}
              onMouseOut={() => setMenuServices(false)}
            >
              {pathname.includes("asistencia-it") || pathname.includes("bioingenieria") || pathname.includes("ciberseguridad") ||  pathname.includes("desarrollo-de-software") || pathname.includes("diseno-ux-ui") || pathname.includes("marketing-digital")?
                <div className="flex cursor-pointer gap-2 p-2 rounded-md bg-slate-300 text-black">
                  <Link href="#">Servicios</Link>
                  <Image src={arrow} alt="arrow icon" width={25} height={24} />
                </div>
                :
                <div className="flex cursor-pointer gap-2">
                  <Link className='text-[#373737]' href="#">Servicios</Link>
                  <Image src={arrow} alt="arrow icon" width={25} height={24} />
                </div>
              }

              {menuServices && (
                <div className="absolute w-max bg-[#F0F0F0] shadow-lg rounded-md">
                  <ul className="space-y-2 block p-2 rounded-b-xl rounded-e-xl">
                    {listServices.map((services, index) => (
                      <li className="hover:bg-slate-200 p-1 w-full text-sm" key={index}>
                        <Link className='text-[#373737]' href={services.href}>{services.name}</Link>
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
              <div className='flex cursor-pointer gap-2'>
                <Link className='text-[#373737]' href="#">Productos</Link>
                <Image src={arrow} alt="arrow icon" width={25} height={24} />
              </div>

              {menuProducts && (
                <div className="absolute w-max bg-[#F0F0F0] shadow-lg rounded-md">
                  <ul className="space-y-2 p-2 block rounded-b-xl rounded-e-xl">
                    {listProducts.map(product => (
                      <li className="hover:bg-slate-200 rounded-md text-sm p-1 w-full" key={product}>
                        <Link className='text-[#373737]' href="#">{product}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {pathname.includes("about") ?
              <Link href="about">
                <li className="cursor-pointer bg-slate-300 text-black p-2 rounded-md">Acerca de Nosotros</li>
              </Link>
              :
              <Link href="about">
                <li className="cursor-pointer text-[#373737] hover:bg-slate-200 p-2 rounded-md">Acerca de Nosotros</li>
              </Link>
            }

            {pathname.includes("frequentquestions") ?
              <Link href="frequentquestions">
                <li className="cursor-pointer bg-slate-300 text-black p-2 rounded-md">Preguntas Frecuentes</li>
              </Link>
              :
              <Link href="frequentquestions">
                <li className="cursor-pointer text-[#373737] hover:bg-slate-200 p-2 rounded-md">Preguntas Frecuentes</li>
              </Link>
            }

          </div>
          <Link href="#">
            <button className=" bg-darkBlue p-2 rounded-lg text-white shadow-lg self-stretch items-center" onClick={scrollToForm}>
              <span className="hidden tablet:inline">Contactar</span>
              <span className="inline tablet:hidden">Contactanos</span>
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
