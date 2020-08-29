import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');    // Set default search term to 'programming' so we can show results to user right away.
    const [debouncedTerm, setDebouncedTerm] = useState(term);   // Debounced term is a delayed version of the value entered in term input field.
    const [results, setResults] = useState([]);

    /**
     * useEffect 1 of 2: Runs any time term changes. 
     * 1. When user enters a character into term input field, we set a timer.
     * 2. If user keeps typing into term input field, we cancel previous timer and set a new one.
     * 3. Eventually, user stops typing based on our definition of 'stopped' being the timer delay.
     * 4. Then, we set our debouncedTerm piece of state.
     */
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    /** 
     * useEffect 2 of 2: Runs any time debouncedTerm changes.
     * 1. Calls search() which invokes API, gets results, and updates results piece of state.
     */
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                }
            });

            setResults(data.query.search);
        };

        search();

    }, [debouncedTerm]);

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" value={term} onChange={e => setTerm(e.target.value)} />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    );
};

export default Search;