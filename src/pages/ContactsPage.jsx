import { Container, Divider } from '@mui/material';
import ContactForm from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const ContactsPage = () => {
  return (
    <main>
      <Container sx={{ mt: '7rem' }}>
        <ContactForm />
        <Divider />
        <Filter />
        <ContactList/>
      </Container>
    </main>
  );
};
