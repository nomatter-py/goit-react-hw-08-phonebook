import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import MyForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Box } from './Box/Box';
import { Container } from './App.styled';

const App = () => {
  return (
    <Box position="relative" as="main">
      <GlobalStyle />
      <Container>
        <Box
          pt={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          as="div"
        >
          <h1>Phonebook</h1>
          <MyForm />
          <Filter />
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
          <ContactList />
        </Box>
      </Container>
    </Box>
  );
};

export default App;
