import React, { createContext, useState } from 'react';
import './styles.css';
import CurrentNumber from './CurrentNumber';
import AddNumber from './AddNumber';
import SubtractNumber from './SubtractNumber';

const NumberContext = createContext();
const AddContext = createContext();
const SubtractContext = createContext();

const App = () => {
    const [number, setNumber] = useState(0);

    const add = () => {
        setNumber(number + 1);
    };

    const subtract = () => {
        setNumber(number <= 0 ? 0 : number - 1);
    };

    return (
        <div className="App">
            <NumberContext.Provider value={number}>
                <CurrentNumber />
            </NumberContext.Provider>
            <AddContext.Provider value={add}>
                <AddNumber />
            </AddContext.Provider>
            <SubtractContext.Provider value={subtract}>
                <SubtractNumber />
            </SubtractContext.Provider>
        </div>
    );
};

export default App;
export { NumberContext, AddContext, SubtractContext };