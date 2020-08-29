import React, { useState } from 'react';

const SearchBar = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    const onSubmit = event => { // This code is triggered when user presses Enter key.
        event.preventDefault(); // Prevent refreshing the page when user submits form by pressing Enter.
        onFormSubmit(term);
    };

    const onInputChange = event => {
        setTerm(event.target.value);
    };

    return (
        <div className="search-bar ui segment">
            <form onSubmit={onSubmit} className="ui form">
                <div className="field">
                    <label>Video Search</label>
                    <input type="text" value={term} onChange={onInputChange} />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;