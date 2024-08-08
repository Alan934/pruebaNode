import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {desplegableApi} from './services/desplegableApi'
import { teamApi } from './services/teamApi'
import { metodologiaApi } from './services/metodologiaApi'
import { subCategoriaApi } from './services/subCategoriaApi'
import { bannerHomeApi} from './services/bannerHomeApi'
import { teOfrecemosApi } from './services/teOfrecemosApi'
import { bannerApi } from './services/bannerApi'
export const store = configureStore({
    reducer: {
        [desplegableApi.reducerPath]: desplegableApi.reducer,
        [teamApi.reducerPath]: teamApi.reducer,
        [metodologiaApi.reducerPath]: metodologiaApi.reducer,
        [subCategoriaApi.reducerPath]: subCategoriaApi.reducer,
        [bannerHomeApi.reducerPath]: bannerHomeApi.reducer,
        [teOfrecemosApi.reducerPath]: teOfrecemosApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat([
            desplegableApi.middleware, 
            teamApi.middleware, 
            metodologiaApi.middleware,
            subCategoriaApi.middleware,
            bannerHomeApi.middleware,
            teOfrecemosApi.middleware,
            bannerApi.middleware,
        ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
