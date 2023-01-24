import { createSlice } from '@reduxjs/toolkit';
import {
  getContactsThunk,
  deleteContactThunk,
  addContactThunk,
} from 'redux/thunks/contactsThunk';
export const getContacts = state => state.contacts.contacts;

const contactsSlice = createSlice({
  error: null,
  isLoading: false,
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contacts = [action.payload, ...state.contacts];
        state.error = null;
        state.isLoading = false;
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, removeContact } = contactsSlice.actions;
