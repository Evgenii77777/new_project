import { createSlice } from '@reduxjs/toolkit';

import {
    changePassword,
    confirmEmail,
    forgotPassword,
    postLogin,
    postReg,
} from '../async/post-user';
import { addEmail, addUser, deleteStatus, deleteType } from '@redux/actions/post-user';

export const loginReducer = createSlice({
    name: 'loginReducer',
    initialState: {
        user: {},
        jwt: '',
        loading: false,
        error: false,
        status: '',
        type: '',
        email: '',
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.jwt = action.payload.accessToken;
            state.type = 'login';
        });
        builder.addCase(postLogin.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            state.status = action.payload;
            state.type = 'login';
        });
        builder.addCase(postReg.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(postReg.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.type = 'registration';
        });
        builder.addCase(postReg.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            state.status = action.payload;
            state.type = 'registration';
        });
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.type = 'forgot';
            state.email = action.payload.email;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            state.type = 'forgot';
            state.email = action.payload.email;
            state.message = action.payload?.data?.message;
        });
        builder.addCase(confirmEmail.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(confirmEmail.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.type = 'confirm';
        });
        builder.addCase(confirmEmail.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            state.type = 'confirm';
            state.status = action.payload;
        });
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(changePassword.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.type = 'change';
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.type = 'change';
        });
        builder.addCase(addUser, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(addEmail, (state, action) => {
            state.email = action.payload;
        });
        builder.addCase(deleteType, (state, action) => {
            state.type = action.payload;
        });
        builder.addCase(deleteStatus, (state, action) => {
            state.status = action.payload;
        });
    },
});
