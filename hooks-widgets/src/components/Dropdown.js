import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selection, onSelectionChange }) => {
    const [open, setOpen] = useState(false);    // State that tracks if dropdown field is expanded or collapsed.
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) { return; }
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        // Define cleanup function that will run if Dropdown component is removed from the screen by the toggle button defined in App.
        // This cleanup function will remove the click event listener that is still active even when Dropdown field has been removed.
        // The goal is to avoid getting an error regarding ref.current being null since a removed component causes its ref.current to be null.
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selection.value) { // Hide selection from appearing twice in dropdown field.
            return null;
        }

        return (
            <div key={option.value} className="item" onClick={(e) => onSelectionChange(option)}>
                {option.label}
            </div>
        );
    });
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="ui label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selection.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;