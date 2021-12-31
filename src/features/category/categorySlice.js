import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiEntity} from "../../utils/apiEntity";
import {startLoad, stopLoad} from "../../common/loader";

const categoryEntity = new ApiEntity("categories");

let initialState = {
    data: [],
    status: ""
};

export const fetchCategoriesAsync = createAsyncThunk(
    'category/fetch',
    async (page) => {
        return await categoryEntity.fetchEntities(page);
    }
);

export const updateCategory = createAsyncThunk(
    "category/update",
    async (arg) => {
        const {id, form} = arg;
        console.log("Form", form, id);
        return await categoryEntity.updateEntity(id, form);
    }
);

export const addCategory = createAsyncThunk(
    "category/add",
    async (formData) => {
        return await categoryEntity.addEntity(formData);
    }
)


const CategorySlice = createSlice({
    name: "category",
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
            .addCase(fetchCategoriesAsync.pending, (state) => {
                startLoad();
            })
            .addCase(fetchCategoriesAsync.rejected, (state) => {
                stopLoad();
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                stopLoad();
                state.data = action.payload;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
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
            .addCase(updateCategory.pending, state => {
                startLoad()
            })
            .addCase(updateCategory.rejected, state => {
                startLoad()
            })
            .addCase(addCategory.pending, state => {
                startLoad();
            })
            .addCase(addCategory.rejected, state => {
                startLoad();
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                stopLoad();
                if (action.payload) {
                    state.data = [...state.data, action.payload];
                }
            })
    }
});

export const {add, replace} = CategorySlice.actions;
export const selectCategories = (state) => state.category.data;
export default CategorySlice.reducer;
