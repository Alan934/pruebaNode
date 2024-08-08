import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Item = {
    id: number;
    subtituloItem: string;
    tituloItem: string;
    urlImagenItem: string;
    idCard: number;
};

type Card = {
    id: number;
    nombreCard: string;
    urlImagenCard: string;
    seccionCardId: number;
    items: Item[];
};

type SeccionCard = {
    id: number;
    subTituloSeccionCard: string;
    tituloSeccionCard: string;
    seccionGeneralId: number;
    cards: Card[];
};

type SeccionGeneral = {
    id: number;
    tituloSeccionGeneral: string;
    subCategoriaId: number;
    seccionCards: SeccionCard[];
};

export const teOfrecemosApi = createApi({
    reducerPath: 'teOfrecemosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backend-rts-institucional.vercel.app/api/',
    }),
    endpoints: (builder) => ({
        getData: builder.query<SeccionGeneral, null>({
            query: () => 'datateOfrecemos.json',
        }),
        getDataSeccionGeneralById: builder.query<SeccionGeneral, number>({
            query:(id) => `seccionGeneral/${id}`,
            transformErrorResponse: (response: any) => response as SeccionGeneral,
        }),
        getDataSeccionCardById: builder.query<SeccionCard, number>({
            query:(id) => `seccionCard/${id}`,
            transformErrorResponse: (response: any) => response as SeccionCard,
        }),
    }),
});

export const {useGetDataSeccionGeneralByIdQuery, useGetDataSeccionCardByIdQuery} = teOfrecemosApi;