import React from "react";
import { lexend } from "../../../app/fonts";
import Image from "next/image";

interface Props {
  url?: string; 
  title: string;
  descripcion: string;
}

const ComoLoLogramosCard: React.FC<Props> = ({ url, title, descripcion }) => {
  return (
    <div className={`bg-zinc-100`}>
      <div
        className={`w-full h-full p-2 bg-zinc-100 rounded-lg border border-slate-300 flex-col justify-start items-center gap-2 inline-flex ${lexend.className}`}
      >
        <div className="flex-col justify-start items-center flex">
          {url ? (
            <Image src={url} alt={title} width={64.91} height={64.91} />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div> 
          )}
        </div>
        <h2
          className={`text-blue-950 text-base font-semibold ${lexend.className} leading-normal`}
        >
          {title}
        </h2>
        <p
          className={`self-stretch text-center text-slate-950 text-xs font-normal ${lexend.className} leading-none`}
          dangerouslySetInnerHTML={{ __html: descripcion }} 
        />
      </div>
    </div>
  );
};

export default ComoLoLogramosCard;
