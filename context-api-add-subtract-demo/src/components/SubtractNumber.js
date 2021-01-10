import React, { useContext } from 'react';
import { SubtractContext } from './App';

const SubtractNumber = () => {
    const subtractFunction = useContext(SubtractContext);

    return <button onClick={subtractFunction}> - </button>
};

export default SubtractNumber;
