import React from 'react';
import PropTypes from 'prop-types';
import { Contact } from 'components/Contact/Contact';
import { ContactListComponent } from './ContactList.styled';

export const ContactList = ({ contacts, deleteHandler }) => {
  return (
    <ContactListComponent>
          {contacts.map(({ id, name, number }) => {
              return (
                  <Contact key={id } id={id} name={name} number={number} deleteHandler={deleteHandler} />
            
              );
          })}
    </ContactListComponent>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
