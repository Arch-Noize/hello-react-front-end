import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    greeting: '',
    isLoading: true,
    error: null,
};

export const getGreetings = createAsyncThunk('greeting/getGreetings', async () => {
    const res = await axios.get('http://localhost:3000/api/random_greeting');
    console.log(res);
    return res.data;
});

const greetingSlice = createSlice({
    name: 'greeting',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getGreetings.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGreetings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.greeting = action.payload;
        })
        .addCase(getGreetings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export default greetingSlice.reducer;