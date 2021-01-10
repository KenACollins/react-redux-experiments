import React, { useContext } from 'react';
import { NumberContext } from './App';

const CurrentNumber = () => {   // Cannot name it Number due to existing Number wrapper function in JavaScript.
    const currentNumber = useContext(NumberContext);

    return <h1>{currentNumber}</h1>;
};

export default CurrentNumber;