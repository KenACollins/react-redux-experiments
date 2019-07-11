import React from 'react';

class SearchBar extends React.Component {
    state = { term: '' };

    onFormSubmit = event => {   // This code is triggered when user presses Enter key.
        event.preventDefault(); // Prevent refreshing the page when user submits form by pressing Enter.
        this.props.onFormSubmit(this.state.term);
    }

    onInputChange = event => {
        this.setState({ term: event.target.value });
    };

    render() {
        return (
            <div className="search-bar ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Video Search</label>
                        <input type="text" value={this.state.term} onChange={this.onInputChange} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;