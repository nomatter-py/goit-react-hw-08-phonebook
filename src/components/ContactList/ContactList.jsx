import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleItems } from 'redux/contacts/contacts-selectors';
import { Contact } from 'components/Contact/Contact';
import { ContactListComponent, ContactsListHeader } from './ContactList.styled';
import { fetchContacts } from 'redux/contacts/contacts-operations';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  let isLoading = useSelector(state => state.contacts.isLoading);

  let filteredItems = useSelector(getVisibleItems);

  if (!filteredItems.length) {
    return null;
  }

  return (
    <>
      <ContactsListHeader>Contacts</ContactsListHeader>
      {isLoading && <h2>Loading ...</h2>}
      <ContactListComponent>
        {filteredItems.map(({ id, name, phone }) => {
          return <Contact key={id} id={id} name={name} number={phone} />;
        })}
      </ContactListComponent>
    </>
  );
};
