import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box } from 'components/Box/Box';
import { Input } from './ContactForm.styled';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  number: Yup.string().required('Required'),
});

const existsInContacts = (name, contacts) => {
  return contacts.find(contact => contact.name === name);
};

export default function ContactForm({ onSubmit, contacts }) {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (!existsInContacts(values.name, contacts)) {
          onSubmit(values);
          resetForm();
        } else {
          Notify.failure(`${values.name} is already in contacts`);
        }
      }}
    >
      <Form autoComplete="off">
        <Box
          display="flex"
          justifyContent="space-between"
          width="400px"
          pt={5}
          mb={3}
          as="div"
        >
          {' '}
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
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
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          />
        </Box>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
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
