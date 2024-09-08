import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Judge } from '@/types/judges';

const initialState: Judge[] = [];

export const fetchAllJudges = createAsyncThunk('judges/fetchAllJudges', async () => {
    const response = await axios.get('/api/judges/fetchAllJudges');
    return response.data;
});

export const addJudge = createAsyncThunk('judges/addJudge', async (newJudge: Omit<Judge, 'id'>) => {
    const response = await axios.post('/api/judges/addJudge', newJudge);
    return response.data;
});

export const deleteJudge = createAsyncThunk('judges/deleteJudge', async (id: number) => {
    await axios.delete(`/api/judges/delete/`, {
        params: {
            id: id
        }
    });
    return id;
});

const judgesSlice = createSlice({
    name: 'judges',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllJudges.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addJudge.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(deleteJudge.fulfilled, (state, action) => {
                return state.filter((judge) => judge.id !== action.payload);
            });
    },
});

export default judgesSlice.reducer;
