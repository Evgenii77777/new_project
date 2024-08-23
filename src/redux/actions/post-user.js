import { createAction } from '@reduxjs/toolkit';

export const addUser = createAction('add/User');
export const addEmail = createAction('add/Email');
export const deleteType = createAction('delete/Type');
export const deleteStatus = createAction('delete/Status');
export const deleteMessage = createAction('delete/Message');
