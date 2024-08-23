import { axiosInstance, baseURL } from '@redux/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTraining = createAsyncThunk(
    'training/getTraining',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${baseURL}/trasining`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const getTrainingList = createAsyncThunk(
    'trainingList/getTrainingList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${baseURL}/catalogs/training-list`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const postTrainingList = createAsyncThunk(
    'trainingList/postTrainingList',
    async (training, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${baseURL}/training`, training);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const putTrainingList = createAsyncThunk(
    'trainingPutList/putTrainingList',
    async (trainingObj, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `${baseURL}/training/${trainingObj.trainingId}`,
                trainingObj.training,
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
