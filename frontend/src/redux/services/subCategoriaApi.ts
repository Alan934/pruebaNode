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

type HomeBanner ={
    id: number;
    urlImagenCard: string;
    TituloBannerHero: string;
    DescripcionBannerHome: string;
    subCategoriaId: number; 
}

type Banner = {
    id: number,
    tituloBanner: string,
    urlImagenBanner: string,
    subCategoriaId: number,
}

type SubCategoria = {
    id: number;
    nombreSubCategoria: string;
    CategoriaId: number;
    seccionGenerals: SeccionGeneral[];
    bannerheros: HomeBanner[];
    banners: Banner[];
};


export const subCategoriaApi = createApi({
    reducerPath: 'subCategoriaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backend-rts-institucional.vercel.app/api/',
    }),
    endpoints: (builder) => ({
        getData: builder.query<SubCategoria, null>({
            query: () => 'dataSubCategoriaInicio.json',
        }),
        getDataSubCategoriaById: builder.query<SubCategoria, number>({
            query: (id) => `subcategoria/${id}`,
            transformErrorResponse: (response: any) => response as SubCategoria,     
        }),
    }),
});

export const {useGetDataSubCategoriaByIdQuery} = subCategoriaApi;