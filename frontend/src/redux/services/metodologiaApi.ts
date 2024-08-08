import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface MetodologiaData {
    title: string;
    items: string[];
    subCategoriaId:number
  }

export const metodologiaApi = createApi({
    reducerPath: 'metodologiaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/json/',
    }),
    endpoints: (builder) => ({
        getMetodologia: builder.query<MetodologiaData[], null>({
            query: () => 'dataMetodologia.json',
        }),
        getMetodologiaBySubCategoria: builder.query<MetodologiaData[], number>({
            queryFn: async (subCategoriaId, queryApi, extraOptions, baseQuery) => {
                const result = await baseQuery('dataMetodologia.json'); 
                if (result.error) return { error: result.error };

                const data = result.data as MetodologiaData[]; 
                const filteredData = data.filter((item) => item.subCategoriaId === subCategoriaId); 
                return { data: filteredData };
            },
        }),
    }),
});


export const {useGetMetodologiaQuery, useGetMetodologiaBySubCategoriaQuery} = metodologiaApi