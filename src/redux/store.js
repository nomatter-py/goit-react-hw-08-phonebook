import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contacts-slice';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

