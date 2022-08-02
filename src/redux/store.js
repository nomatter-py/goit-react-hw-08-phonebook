import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contacts-reducer';
import { loadState } from "../services/bowser-storage";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
    preloadedState: loadState(),
})