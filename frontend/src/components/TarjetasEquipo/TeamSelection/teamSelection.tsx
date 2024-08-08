import React from 'react';
import TeamCard from '../TeamCard/teamCard';
import { StaticImageData } from 'next/image';

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

interface TeamSelectionProps {
  equipo: TeamData;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({ equipo }) => {
  return (
    
      <div className="flex flex-wrap justify-center ">
        {equipo.integrantes.map((integrante, index) => (
          <TeamCard key={index} integrante={integrante} />
        ))}
      </div>
    
  );
}

export default TeamSelection;
