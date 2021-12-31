import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiEntity} from "../../utils/apiEntity";
import {startLoad, stopLoad} from "../../common/loader";

const vodEntity = new ApiEntity("vods");

let initialState = {
    data: [],
    status: ""
};

export const fetchVods = createAsyncThunk(
    'vod/fetch',
    async (page) => {
        return await vodEntity.fetchEntities(page);
    }
);

export const updateVod = createAsyncThunk(
    "vod/update",
    async (arg) => {
        const {id, form} = arg;
        console.log("Form", form, id);
        return await vodEntity.updateEntity(id, form);
    }
);

export const addVod = createAsyncThunk(
    "vod/add",
    async (formData) => {
        return await vodEntity.addEntity(formData);
    }
)

const VodSlice = createSlice({
    name: "vod",
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
            .addCase(fetchVods.pending, () => {
                startLoad();
            })
            .addCase(fetchVods.rejected, () => {
                stopLoad();
            })
            .addCase(fetchVods.fulfilled, (state, action) => {
                stopLoad();
                state.data = [...state.data || [], ...action.payload];
            })
            .addCase(updateVod.fulfilled, (state, action) => {
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
            .addCase(updateVod.pending, () => {
                startLoad()
            })
            .addCase(updateVod.rejected, () => {
                startLoad()
            })
            .addCase(addVod.pending, () => {
                startLoad();
            })
            .addCase(addVod.rejected, () => {
                startLoad();
            })
            .addCase(addVod.fulfilled, (state, action) => {
                stopLoad();
                if (action.payload) {
                    state.data = [...state.data, action.payload];
                }
            })
    }
});


export const {add, replace} = VodSlice.actions;
export const selectVods = (state) => state.vod.data;
export default VodSlice.reducer;
