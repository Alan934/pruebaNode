import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type FormData = {
    nombre: string;
    email: string;
    empresa: string;
    rubrompresa: string;
    mensaje: string;
};

type ResponseType = {
    success: boolean;
    message?: string;
    
};

export const formApi = createApi({
    reducerPath: 'formApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backend-rts-institucional.vercel.app/api',
    }),
    endpoints: (builder) => ({
        postData: builder.mutation<ResponseType, Partial<FormData>>({
            query: (newFormData) => ({
                url: 'formulario',
                method: 'POST',
                body: newFormData,
            }),
           
        }),
    }),
});

export const { usePostDataMutation } = formApi;
