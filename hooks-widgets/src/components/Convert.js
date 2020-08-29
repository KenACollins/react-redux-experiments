import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translation, setTranslation] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);   // Debounced text is a delayed version of the value entered in text input field.

    /**
     * useEffect 1 of 2: Runs any time text changes. 
     * 1. When user enters a character into text input field, we set a timer.
     * 2. If user keeps typing into text input field, we cancel previous timer and set a new one.
     * 3. Eventually, user stops typing based on our definition of 'stopped' being the timer delay.
     * 4. Then, we set our debouncedText piece of state.
     */
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [text]);

    /** 
     * useEffect 2 of 2: Runs any time language or debouncedText changes.
     * 1. Calls doTranslation() which invokes API, gets translation, and updates translation piece of state.
     */
    useEffect(() => {
        const doTranslation = async () => {
            // Destructure out the data property of the response object passed back from the API.
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                },
            });

            setTranslation(data.data.translations[0].translatedText);
        };

        doTranslation();

    }, [language, debouncedText]);

    return (
        <div><h1 className="ui header">{translation}</h1></div>
    );
};

export default Convert;