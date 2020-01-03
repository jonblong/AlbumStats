import React from 'react';
import './SearchBar.css';
import icon from './search.svg';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.searchForAlbum(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div id='searchPanel'>
        <form id='search' onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Search for an album...' value={this.state.value} onChange={this.handleChange} />
          <label>
            <input type='submit'/>
            <img id='searchIcon' src={icon} width='50px'/>
          </label>
        </form>
      </div>
    )
  }
}

export default SearchBar;