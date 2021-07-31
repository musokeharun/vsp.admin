import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uploadReducer from "../features/storage/upload/UploadSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        uploads: uploadReducer
    },    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
