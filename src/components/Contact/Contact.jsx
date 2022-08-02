import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ContactItem, Button } from './Contact.styled';
import { AiOutlineClose } from 'react-icons/ai';
import actions from '../../redux/contacts/contacts-actions';

export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <ContactItem>
      <div>
        <div>{name}</div>
        <div>{number}</div>
      </div>
      <Button type="button" onClick={() => dispatch(actions.deleteContact(id))}>
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
