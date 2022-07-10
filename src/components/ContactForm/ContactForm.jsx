import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box } from 'components/Box/Box';
import { Input, Button } from './ContactForm.styled';

const existsInContacts = (name, contacts) => {
  return contacts.find(contact => contact.name === name);
};

const ContactForm = ({ onSubmit, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

    if (!existsInContacts(name, contacts)) {
      onSubmit({ name, number });
      reset();
    } else {
      Notify.failure(`${name} is already in contacts`);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  //const { name, number } = this.state;
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="400px"
        pt={5}
        mb={3}
        as="div"
      >
        <label htmlFor="name">Name</label>
        <Input
          type="text"
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
        width="400px"
        mb={3}
        as="div"
      >
        <label htmlFor="number">Number</label>
        <Input
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        />
      </Box>
      <Button type="submit">Add contact</Button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      key: PropTypes.string,
    })
  ),
};

export default ContactForm;
