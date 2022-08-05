import React from 'react';
import { useSelector } from 'react-redux';
import { getVisibleItems } from 'redux/contacts/contacts-selectors';
import { Contact } from 'components/Contact/Contact';
import { ContactListComponent, ContactsListHeader } from './ContactList.styled';

export const ContactList = () => {
  let filteredItems = useSelector(getVisibleItems);

  if (!filteredItems.length) {
    return null;
  }

  return (
    <>
      <ContactsListHeader>Contacts</ContactsListHeader>
      <ContactListComponent>
        {filteredItems.map(({ id, name, number }) => {
          return <Contact key={id} id={id} name={name} number={number} />;
        })}
      </ContactListComponent>
    </>
  );
};
