import React from 'react';
import PropTypes from 'prop-types';
import { ContactItem, Button } from './Contact.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { useDeleteContactMutation } from 'redux/contacts/contacts-api';

export const Contact = ({ id, name, number }) => {

  const [deleteContact] = useDeleteContactMutation();
  const handleDelete = async id => {
    await deleteContact(id);
  };

  return (
    <ContactItem>
      <div>
        <div>{name}</div>
        <a href={`tel:${number}`}>{number}</a>
      </div>
      <Button type="button" onClick={() => handleDelete(id)}>
        <AiOutlineClose />
      </Button>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
