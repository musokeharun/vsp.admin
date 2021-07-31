import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    status: '',
    uploads: []
};

export const uploadSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        add: (state, action) => {
            state.uploads = [...state.uploads, action.payload];
        },
        remove: (state, action) => {
            console.log("Payload", action.payload);
            state.uploads = state.uploads.filter(({id}) => id !== action.payload);
        }
    },
});

export const {add, remove} = uploadSlice.actions;

export const selectUploads = (state) => state.uploads.uploads;

export default uploadSlice.reducer;