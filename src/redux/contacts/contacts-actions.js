import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const addContact = createAction('contacts/add', data => {
  return {
    payload: {
      id: nanoid(),
      name: data.name,
      number: data.number,
    },
  };
});

const deleteContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

const combined = { addContact, deleteContact, changeFilter };

export default combined;
