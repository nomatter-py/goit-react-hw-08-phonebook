import React from 'react';
import PropTypes from 'prop-types';
import { ContactListComponent, ContactItem } from './ContactList.styled';

export const ContactList = ({ contacts, deleteHandler }) => {
  return (
    <ContactListComponent>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem key={id}>
            <div>
              <div>{name}</div><div>{number}</div>
            </div>
            <button type="button" onClick={() => deleteHandler(id)}>
              delete
            </button>
          </ContactItem>
        );
      })}
    </ContactListComponent>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};
