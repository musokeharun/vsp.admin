import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiEntity} from "../../utils/apiEntity";
import {startLoad, stopLoad} from "../../common/loader";

const genreEntity = new ApiEntity("genres");

let initialState = {
    data: [],
    status: ""
};

export const fetchGenres = createAsyncThunk(
    'genre/fetch',
    async (page) => {
        return await genreEntity.fetchEntities(page);
    }
);

export const updateGenre = createAsyncThunk(
    "genre/update",
    async (arg) => {
        const {id, form} = arg;
        console.log("Form", form, id);
        return await genreEntity.updateEntity(id, form);
    }
);

export const addGenre = createAsyncThunk(
    "genre/add",
    async (formData) => {
        return await genreEntity.addEntity(formData);
    }
);


const GenreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        add: ((state, action) => {
            state.data = [...state.data, action.payload];
        }),
        replace: ((state, action) => {
            state.data = action.payload;
        })
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                startLoad();
            })
            .addCase(fetchGenres.rejected, (state) => {
                stopLoad();
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                stopLoad();
                state.data = action.payload;
            })
            .addCase(updateGenre.fulfilled, (state, action) => {
                stopLoad();
                if (action.payload) {
                    let copy = [...state['data']];
                    let index = copy.findIndex(({objectId}) => objectId === action.payload.objectId);
                    if (index !== undefined) {
                        copy[index] = action.payload;
                        state.data = copy;
                    }
                }
            })
            .addCase(updateGenre.pending, state => {
                startLoad()
            })
            .addCase(updateGenre.rejected, state => {
                startLoad()
            })
            .addCase(addGenre.pending, state => {
                startLoad();
            })
            .addCase(addGenre.rejected, state => {
                startLoad();
            })
            .addCase(addGenre.fulfilled, (state, action) => {
                stopLoad();
                if (action.payload) {
                    state.data = [...state.data, action.payload];
                }
            })
    }
});

export const {add, replace} = GenreSlice.actions;
export const selectGenres = (state) => state.genre.data;
export default GenreSlice.reducer;
