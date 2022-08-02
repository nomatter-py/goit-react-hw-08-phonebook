import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import { FilterBox, FilterInput } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <FilterBox>
      <h2>Find contacts by name</h2>
      <FilterInput onChange={e => dispatch(actions.changeFilter(e.target.value))} />
    </FilterBox>
  );
}


