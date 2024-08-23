import { createSlice } from '@reduxjs/toolkit';

import { getFeedbacks, postFeedbacks } from '../async/feedbacks';
import { deleteMessage, deleteType } from '@redux/actions/post-user';

export const feedbacksReducer = createSlice({
    name: 'feedbacks',
    initialState: {
        feedbacks: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeedbacks.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getFeedbacks.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.feedbacks = action.payload;
        });
        builder.addCase(getFeedbacks.rejected, (state) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(postFeedbacks.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(postFeedbacks.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.type = 'feedbacks';
        });
        builder.addCase(postFeedbacks.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.type = 'feedbacks';
            state.message = 'error';
        });
        builder.addCase(deleteType, (state, action) => {
            state.type = action.payload;
        });
        builder.addCase(deleteMessage, (state, action) => {
            state.message = action.payload;
        });
    },
});
