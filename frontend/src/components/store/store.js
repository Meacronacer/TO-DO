import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import {apiSlice, authApi} from '../../api/apiSlice'

const store = configureStore({
    reducer: {
        reducer,
        [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: () => getDefaultMiddleware({serializableCheck: false}
    ).concat(apiSlice.middleware, authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;