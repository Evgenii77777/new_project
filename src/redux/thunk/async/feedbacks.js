import { axiosInstance, baseURL } from '@redux/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedbacks = createAsyncThunk(
    'feedbacks/getFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${baseURL}/feedback`);

            return response.data.reverse();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const postFeedbacks = createAsyncThunk(
    'feedbacks/postFeedbacks',
    async (message, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${baseURL}/feedback`, message);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
