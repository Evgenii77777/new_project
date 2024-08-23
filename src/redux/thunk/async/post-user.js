import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.withCredentials = true;

import { baseURL } from '../../api/api';

export const postLogin = createAsyncThunk('login/postLogin', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, {
            email: user.email,
            password: user.password,
        });
        if (user.remember) {
            localStorage.setItem('JWT', response.data?.accessToken);
        } else {
            sessionStorage.setItem('JWTSession', response.data?.accessToken);
        }

        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postReg = createAsyncThunk(
    'registration/postReg',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/auth/registration`, user);

            localStorage.setItem('JWT', response.data?.accessToken);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.status);
        }
    },
);

export const forgotPassword = createAsyncThunk(
    'user/postForgPass',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/auth/check-email`, {
                email,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    },
);

export const confirmEmail = createAsyncThunk(
    'user/confirmEmail',
    async (info, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/auth/confirm-email`, info);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    },
);

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (info, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/auth/change-password`, info);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    },
);
