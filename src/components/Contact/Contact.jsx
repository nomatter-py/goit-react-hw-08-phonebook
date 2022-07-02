import React from 'react';
import PropTypes from 'prop-types';
import { ContactItem, Button } from './Contact.styled';

export const Contact = ({ id, name, number, deleteHandler }) => {
  return (
    <ContactItem>
      <div>
        <div>{name}</div>
        <div>{number}</div>
      </div>
      <Button type="button" onClick={() => deleteHandler(id)}>
        delete
      </Button>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
