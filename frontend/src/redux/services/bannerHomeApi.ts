
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type HomeBanner = {
  id: number;
  urlImagenBannerHero: string;
  tituloBannerHero: string;
  descripcionBannerHero: string;
  subCategoriaId: number; 
};

type SubCategoria = {
  id: number;
  nombreSubCategoria: string;
  CategoriaId: number;
  bannerheros: HomeBanner[];
};
 
export const bannerHomeApi = createApi({
  reducerPath: 'bannerHomeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl:'https://backend-rts-institucional.vercel.app/api/', 
  }),
  endpoints: (builder) => ({
    getData: builder.query<HomeBanner, null>({
      query: () => 'dataHomeBanenr.json',
    }),
    getDataHomeBannerById: builder.query<HomeBanner, number>({
      query: (id) => `bannerhero/${id}`,   
    }),
  }),
});

export const {useGetDataQuery, useGetDataHomeBannerByIdQuery} = bannerHomeApi;