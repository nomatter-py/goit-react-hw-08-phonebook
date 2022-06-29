import React from 'react';
import PropTypes from 'prop-types';
import { ContactItem } from './Contact.styled';

export const Contact = ({ id, name, number, deleteHandler }) => {
  return (
    <ContactItem>
      <div>
        <div>{name}</div>
        <div>{number}</div>
      </div>
      <button type="button" onClick={() => deleteHandler(id)}>
        delete
      </button>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
