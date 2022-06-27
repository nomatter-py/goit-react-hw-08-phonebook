import 'normalize.css';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { Component } from 'react';
import MyForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Box } from './Box/Box';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  submitHandler = ({ name, number }) => {
    const id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact => {
      if (this.filter !== '') {
        return contact.name
          .toLowerCase()
          .includes(this.state.filter.toLowerCase());
      } else {
        return true;
      }
    });
  };

  filterHandler = filter => {
    this.setState({ filter });
  };

  deleteHandler = id => {
    console.log(id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    let filteredList = this.filteredContacts();
    return (
      <Box position="relative" as="main">
        <GlobalStyle />
        <Box pt={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" as="div">
          <h1>Phonebook</h1>
          <MyForm
            onSubmit={this.submitHandler}
            contacts={this.state.contacts}
          />
          <Filter onFilter={this.filterHandler} />
        </Box>
        <Box p={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center"as="div">
          <h2>Contacts</h2>
          <ContactList
            contacts={filteredList}
            deleteHandler={this.deleteHandler}
          />
        </Box>
      </Box>
    );
  }
}
