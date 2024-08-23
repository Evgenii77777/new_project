import { createSlice } from '@reduxjs/toolkit';

import { deleteMessage, deleteType } from '@redux/actions/post-user';
import { getTraining, getTrainingList, postTrainingList, putTrainingList } from '../async/training';

export const trainingReducer = createSlice({
    name: 'training',
    initialState: {
        training: [],
        trainingData: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTraining.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getTraining.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.trainingData = action.payload;
        });
        builder.addCase(getTraining.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.message = 'errorGetTraining';
        });
        builder.addCase(getTrainingList.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getTrainingList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.training = action.payload;
        });
        builder.addCase(getTrainingList.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.type = 'errorList';
        });
        builder.addCase(postTrainingList.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(postTrainingList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.trainingData = [...state.trainingData, action.payload];
        });
        builder.addCase(postTrainingList.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.type = 'errorPostList';
        });
        builder.addCase(putTrainingList.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(putTrainingList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.trainingData = [...state.trainingData, action.payload];
        });
        builder.addCase(putTrainingList.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.type = 'errorPostList';
        });

        builder.addCase(deleteType, (state, action) => {
            state.type = action.payload;
        });
        builder.addCase(deleteMessage, (state, action) => {
            state.message = action.payload;
        });
    },
});
