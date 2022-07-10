import 'normalize.css';
import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import MyForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Box } from './Box/Box';

const App = () => {

  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      return [...parsedContacts];
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = ({ name, number }) => {
    const id = nanoid();
    setContacts(prevState => [...prevState, { id, name, number }]);
  };

  const filteredContacts = () => {
    return contacts.filter(contact => {
      if (filter !== '') {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      } else {
        return true;
      }
    });
  };

  const filterHandler = filterValue => {
    setFilter(filterValue);
  };

  const deleteHandler = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  let filteredList = filteredContacts();
  return (
    <Box position="relative" as="main">
      <GlobalStyle />
      <Box
        pt={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        as="div"
      >
        <h1>Phonebook</h1>
        <MyForm onSubmit={submitHandler} contacts={contacts} />
        <Filter onFilter={filterHandler} />
      </Box>
      <Box
        p={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        as="div"
      >
        <h2>Contacts</h2>
        <ContactList contacts={filteredList} deleteHandler={deleteHandler} />
      </Box>
    </Box>
  );
};

export default App;
