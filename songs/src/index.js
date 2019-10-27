import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';      // Actual export name is "combineReducers" but we assign new name here.

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);