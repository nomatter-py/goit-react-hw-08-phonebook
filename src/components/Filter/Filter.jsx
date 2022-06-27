import { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterBox, FilterInput } from './Filter.styled';

export default class Filter extends Component {
  state = {
    filter: '',
  };
    
  filterChange = e => {
    this.setState({ filter: e.target.value });
    this.props.onFilter(e.target.value);
  };

  render() {
    return (
      <FilterBox>
        <h2>Find contacts by name</h2>
        <FilterInput value={this.state.filter} onChange={this.filterChange} />
      </FilterBox>
    );
  }
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
