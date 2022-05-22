// The purpose of this custom hook is to enable processing of state to pause while user is still entering characters in search field.
// This avoids calling a back-end API for each character entered.
import { useState, useEffect } from 'react';

export const useDebounce = (value, callback, delayInMilliseconds = 500) => {
    const [timerId, setTimerId] = useState(null);

    const clearTimer = () => {
        if (timerId) { clearTimeout(timerId); }
    };

    // Trigger this useEffect hook every time value changes, to clear current timer and set a new timer.
    // Once user stops typing and the value stablizes, this hook will clear the final timer but not set a new one.
    useEffect(() => {
        clearTimer();

        if (value && callback) {
            const newTimerId = setTimeout(callback, delayInMilliseconds);
            setTimerId(newTimerId);
        }
    }, [value]);
};