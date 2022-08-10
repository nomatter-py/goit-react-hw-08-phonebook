import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ContactItem, Button } from './Contact.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { removeContact } from 'redux/contacts/contacts-operations';


export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <ContactItem>
      <div>
        <div>{name}</div>
        <a href={`tel:${number}`}>{number}</a>
      </div>
      <Button type="button" onClick={() => dispatch(removeContact(id))}>
        <AiOutlineClose/>
      </Button>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
