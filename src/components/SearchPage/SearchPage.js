import React from 'react';
import './searchPage.css';
import icon from './search.svg';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // fired whenever the textbox changes
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    
    // fired when the text is 'submitted'
    handleSubmit(event) {
        this.props.searchForAlbum(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id="SearchPage">
                <form id='search-form' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search for an album...' value={this.state.value} onChange={this.handleChange} />
                    <label>
                        <input type='submit'/>
                        <img id='search-icon' src={icon} width='50px'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default SearchPage;