import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
    {
        label: 'German',
        value: 'de'
    },
    {
        label: 'Irish',
        value: 'ga'
    },
    {
        label: 'Hebrew',
        value: 'he'
    },
    {
        label: 'Dutch',
        value: 'nl'
    },
];

const Translate = () => {
    const [language, setLanguage] = useState(options[0]);   // Set default option to be the first one (Afrikaans).
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text in English</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <Dropdown label="Select a Language for the Translation" options={options} selection={language} onSelectionChange={setLanguage} />
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert language={language} text={text} />
        </div>
    );
};

export default Translate;