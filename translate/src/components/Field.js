import React from "react";
import LanguageContext from "../contexts/LanguageContext";

class Field extends React.Component {
    static contextType = LanguageContext; // Required syntax to enable 'this.context' reference below.

    render() {
        const text = this.context === "english" ? "Name" : "Naam";
        return (
            <div className="ui field">
                <label>{text}</label>
                <input />
            </div>
        );
    }
}

export default Field;
