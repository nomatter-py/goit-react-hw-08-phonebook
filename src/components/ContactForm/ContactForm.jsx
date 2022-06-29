import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box } from 'components/Box/Box';
import { Input } from './ContactForm.styled';

const existsInContacts = (name, contacts) => {
  return contacts.find(contact => contact.name === name);
};

export default class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name } = this.state;
    const { contacts, onSubmit } = this.props;
    
    if (!existsInContacts(name, contacts)) {
      onSubmit({ ...this.state });
      this.reset();
    } else {
      Notify.failure(`${name} is already in contacts`);
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          />
        </Box>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

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
