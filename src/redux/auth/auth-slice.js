import { createSlice } from '@reduxjs/toolkit';
import { contactsAPI } from '../contacts/contacts-api';

const initialState = {
  user: { name: null, email: null },
  isLoggedIn: false,
  token: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        contactsAPI.endpoints.signup.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        contactsAPI.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(contactsAPI.endpoints.logout.matchFulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        contactsAPI.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.isLoggedIn = true;
        }
    )
    .addMatcher(
        contactsAPI.endpoints.refresh.matchPending,
        (state, { payload }) => {
          state.isRefreshing = true;
        }
    )
    .addMatcher(
        contactsAPI.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.isRefreshing = false;
        }
    )
    
  },
});

export default authSlice.reducer;

export const authSelectors = {
  getIsLoggedIn: state => state.auth.isLoggedIn,
  getUserName: state => state.auth.user.name,
  getUserMail: state => state.auth.user.email,
  getToken: state => state.auth.token,
  getIsRefreshing: state => state.auth.isRefreshing,
};
