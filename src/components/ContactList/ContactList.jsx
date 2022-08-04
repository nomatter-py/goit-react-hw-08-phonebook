import React from 'react';
import { useSelector } from 'react-redux';
import { Contact } from 'components/Contact/Contact';
import { ContactListComponent , ContactsListHeader} from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  let filteredItems = contacts;
  if (filter !== '') {
    filteredItems = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  if (!filteredItems.length) { return null };

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
