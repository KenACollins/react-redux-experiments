import React, { useContext } from 'react';
import { AddContext } from './App';

const AddNumber = () => {
    const addFunction = useContext(AddContext);

    return <button onClick={addFunction}> + </button>
};

export default AddNumber;
