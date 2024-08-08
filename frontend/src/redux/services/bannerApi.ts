import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Item = {
    id: number,
    subtituloItem: string,
    tituloItem: string,
    urlIconItem: string,
    id_banner: number,
}
type Banner = {
    id: number,
    tituloBanner: string,
    urlImagenBanner: string,
    subCategoriaId: number,
    items: Item[];
}

type SubCategoria = {
    id: number;
    nombreSubCategoria: string;
    CategoriaId: number;
    banners: Banner[];
};

export const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backend-rts-institucional.vercel.app/api/',
    }),
    endpoints: (builder) => ({
        getData: builder.query<Banner, null>({
            query: () => 'dataBanner.json',
        }),
        getDataBannerById: builder.query<Banner, number>({
            query: (id) => `banner/${id}`,
            transformErrorResponse: (response: any) => response as Banner,     
        }),
    }),
});

export const {useGetDataBannerByIdQuery} = bannerApi;