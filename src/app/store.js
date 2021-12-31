import {configureStore} from '@reduxjs/toolkit';
import uploadReducer from "../features/storage/upload/UploadSlice";
import categoryReducer from "../features/category/categorySlice";
import genreReducer from "../features/genres/genreSlice";
import packageReducer from "../features/Package/packageSlice";
import vodReducer from "../features/vod/vodSlice";

export const store = configureStore({
    reducer: {
        uploads: uploadReducer,
        category: categoryReducer,
        genre: genreReducer,
        package: packageReducer,
        vod: vodReducer
    }, middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
