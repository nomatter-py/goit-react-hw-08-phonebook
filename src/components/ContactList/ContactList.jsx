import { useSelector } from 'react-redux';
import { Contact } from 'components/Contact/Contact';
import { Loader } from 'components/Loader/Loader';
import { ContactListComponent, ContactsListHeader } from './ContactList.styled';
import { useGetContactsQuery } from 'redux/contacts/contacts-api';

export const ContactList = () => {
  
  const { data = [],  isLoading, isFetching } = useGetContactsQuery();
  
  const getFilter = useSelector(state => state.contacts.filter);

  
  const getVisibleItems = state => {
    const filter = getFilter;
    const normalizedFilter = filter.toLowerCase();

    return data.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  
  let filteredItems = useSelector(getVisibleItems);

  if (!filteredItems.length) {
     return null
  }

  return (
    <>
      <ContactsListHeader>Contacts</ContactsListHeader>
      {(isFetching||isLoading) && <Loader/>}
      <ContactListComponent>
        {filteredItems.map(({ id, name, phone }) => {
          return <Contact key={id} id={id} name={name} number={phone} />;
        })}
      </ContactListComponent>
    </>
  );
};
