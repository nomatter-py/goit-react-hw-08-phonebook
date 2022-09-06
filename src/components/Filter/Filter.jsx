import React from 'react';
import { useDispatch } from 'react-redux';
import {change} from '../../redux/contacts/filter-slice';
import { TextField, Container } from '@mui/material';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <TextField
        sx={{ mb: '1rem' }}
        label="Filter"
        variant="standard"
        type="text"
        name="filter"
        onChange={e => dispatch(change(e.target.value))}
      />
    </Container>
  );
};
