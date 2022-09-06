import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box, TextField, Button, Container } from '@mui/material';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contacts/contacts-api';

const existsInContacts = (name, contacts) => {
  return contacts.find(contact => contact.name === name);
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data = [] } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleAddContact = async contact => {
    await addContact(contact).unwrap();
    console.log(contact);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!existsInContacts(name, data)) {
      handleAddContact({ name, number });
      reset();
    } else {
      Notify.failure(`${name} is already in contacts`);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Container>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
          as="div"
          mb={2}
        >
          <TextField
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={2}
          as="div"
        >
          <TextField
            type="text"
            label="Phone number"
            name="number"
            value={number}
            onChange={handleChange}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          />
        </Box>
        <Button type="submit" variant="outlined" sx={{ mb: '2rem' }}>
          <AiOutlineUserAdd />
          <span>Add contact</span>
        </Button>
      </Box>
    </Container>
  );
};

export default ContactForm;
