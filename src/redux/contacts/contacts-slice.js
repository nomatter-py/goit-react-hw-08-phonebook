import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/mockapi-api';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      let data = await api.getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.deleteContact(id);
      dispatch(deleteContact(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postContact = createAsyncThunk(
  'contacts/postContact',
  async ({ name, number }, { rejectWithValue, dispatch }) => {
    try {
      const { id } = await api.addContact({ name, number });
      let phone = number;
      dispatch(addContact({ name, phone, id }));
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
      state.items = [];
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: setRejected,
    [removeContact.rejected]: setRejected,
    [postContact.rejected]: setRejected,
  },
});

export const { addContact, deleteContact, changeFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
