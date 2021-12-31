import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiEntity} from "../../utils/apiEntity";
import {startLoad, stopLoad} from "../../common/loader";

const packageEntity = new ApiEntity("packages");

let initialState = {
    data: [],
    status: ""
};

export const fetchPackages = createAsyncThunk(
    'package/fetch',
    async (page) => {
        return await packageEntity.fetchEntities(page);
    }
);

export const updatePackage = createAsyncThunk(
    "package/update",
    async (arg) => {
        const {id, form} = arg;
        console.log("Form", form, id);
        return await packageEntity.updateEntity(id, form);
    }
);

export const addPackage = createAsyncThunk(
    "package/add",
    async (formData) => {
        return await packageEntity.addEntity(formData);
    }
)


const PackageSlice = createSlice({
    name: "package",
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
            .addCase(fetchPackages.pending, (state) => {
                startLoad();
            })
            .addCase(fetchPackages.rejected, (state) => {
                stopLoad();
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                stopLoad();
                state.data = action.payload;
            })
            .addCase(updatePackage.fulfilled, (state, action) => {
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
            .addCase(updatePackage.pending, state => {
                startLoad()
            })
            .addCase(updatePackage.rejected, state => {
                startLoad()
            })
            .addCase(addPackage.pending, state => {
                startLoad();
            })
            .addCase(addPackage.rejected, state => {
                startLoad();
            })
            .addCase(addPackage.fulfilled, (state, action) => {
                stopLoad();
                if (action.payload) {
                    state.data = [...state.data, action.payload];
                }
            })
    }
});

export const {add, replace} = PackageSlice.actions;
export const selectPackages = (state) => state.package.data;
export default PackageSlice.reducer;
