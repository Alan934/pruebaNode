import React from 'react';

import { lexend } from "../../../app/fonts";

interface Props {
  title: string;
  descripcion: string;
}

const valoresCard: React.FC<Props> = ({ title, descripcion }) => {
  return (
    <div className={`border border-gray-300 rounded-lg p-4 max-w-5xl mx-auto text-center ${lexend.className}`}>
      <h2 className="text-lg font-semibold mb-2 text-blue-950">{title}</h2>
      <p 
        className="text-sm text-center"
        dangerouslySetInnerHTML={{ __html: descripcion }} // Renderizar el HTML para salto de linea
      />
    </div>
  );
}
 export default valoresCard;
 