import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contacts-slice';
import { contactsSlice } from './contacts/contacts-slice';
import { contactsAPI } from './contacts/contacts-api';



export const store = configureStore({
    reducer: {
        //contacts: contactsReducer,
        [contactsSlice.name]: contactsReducer,
        [contactsAPI.reducerPath]: contactsAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsAPI.middleware),
})


