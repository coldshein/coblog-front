import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    console.log(params)
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
            
        },
        [fetchAuth.rejected]: (state, action) => {
            state.data = null;
            state.status = 'error';
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions