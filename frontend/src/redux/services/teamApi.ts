import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/json/',
    }),
    endpoints: (builder) => ({
        getTeam: builder.query<TeamData[], null>({
            query: () => 'dataEquipos.json',
        }),
        
    }),
});


export const {useGetTeamQuery} = teamApi