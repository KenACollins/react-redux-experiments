import React from 'react';
import Modal from './Modal';

const App = () => {
    const actions = (
        <>
            <div onClick={() => alert("You clicked Delete. Replace this boiler plate with real click action.")} className="ui button negative">Delete</div>
            <div onClick={() => alert("You clicked Cancel. Replace this boiler plate with real click action.")} className="ui button">Cancel</div>
        </>
    );

    return (
        <div>
            App
            <Modal title="Delete Thing" content="Are you sure you want to delete this thing? Tip: If you click outside this modal dialog, it will go away." actions={actions} />
        </div>);
};

export default App;
