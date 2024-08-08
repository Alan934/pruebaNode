import React from "react";
import Image from "next/image";
import { lexend } from "@/app/fonts";

const Tecnologias = () => {
  return (
    <section className="mt-4">
      <div
        className={`text-slate-950 font-bold ps-48 ${lexend.className} leading-7`}
      >
        Tecnologías
      </div>
      <div className="flex justify-center ">
        <div className="w-[1058px] h-[60px] justify-center gap-8 items-center inline-flex">
          <Image
            src="/img/TypeScript.svg"
            width={60}
            height={36.2}
            alt=""
            className=" relative"
          />
          <Image
            src="/img/NextJs.svg"
            width={60}
            height={31.16}
            alt=""
            className=" relative"
          />
          <Image
            src="/img/MySQL.svg"
            width={60}
            height={39.13}
            alt=""
            className=" justify-center items-center flex"
          />
          <Image
            src="/img/NodeJs.png"
            width={60}
            height={39.13}
            alt=""
            className=" justify-center items-center flex"
          />
        </div>
      </div>
      <div className="flex justify-center items-center p-6">
        <button className="w-[231px] h-[46px] p-2 bg-orange-600 rounded-lg shadow-lg justify-center items-center gap-2.5 inline-flex">
          <div className="text-zinc-100 text-base font-normal font-['Roboto'] leading-[29.38px]">
            ¡Comienza tu proyecto ahora!
          </div>
        </button>
      </div>
    </section>
  );
};

export default Tecnologias;
