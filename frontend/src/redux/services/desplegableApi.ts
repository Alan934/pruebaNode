import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Item = {
    tituloItem: string;
    subTituloItem: string;
    urlImagenItem?: string
};

type Desplegable = {
    textoDesplegable: string;
    items: Item[];
};

type SeccionDesplegable = {
    idSeccionDesplegable: number;
    nombreSeccionDesplegable: string;
    desplegables: Desplegable[];
};

export const desplegableApi = createApi({
    reducerPath: 'desplegableApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/json/',
    }),
    endpoints: (builder) => ({
        getData: builder.query<SeccionDesplegable, null>({
            query: () => 'dataDesplegable.json',
        }),
        getDataBySeccion: builder.query<SeccionDesplegable, number>({
          queryFn: async (idSeccionDesplegable, queryApi, extraOptions, baseQuery) => {
              const result = await baseQuery('dataDesplegable.json');
              if (result.error) return { error: result.error };

              const data = result.data as SeccionDesplegable[];
              const filteredData = data.find(section => section.idSeccionDesplegable === idSeccionDesplegable);

              if (!filteredData) {
                  return { error: { status: 'CUSTOM_ERROR', error: 'Section not found' } };
              }

              return { data: filteredData };
          },
      }),
    }),
});

export const { useGetDataQuery, useGetDataBySeccionQuery } = desplegableApi;
