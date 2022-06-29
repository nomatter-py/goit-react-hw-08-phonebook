import React from 'react';
import PropTypes from 'prop-types';
import { FilterBox, FilterInput } from './Filter.styled';

export const Filter = ({ onFilter }) => {
  return (
    <FilterBox>
      <h2>Find contacts by name</h2>
      <FilterInput onChange={e => onFilter(e.target.value)} />
    </FilterBox>
  );
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
