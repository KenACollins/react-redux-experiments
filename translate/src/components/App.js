import React from "react";
import UserCreate from "./UserCreate";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class App extends React.Component {
    state = { language: "english" };

    onLanguageChange = language => {
        this.setState({ language }); // Condensed syntax since key and value are the same.
    };

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a language:&nbsp;&nbsp;
                    <i className="flag us" onClick={() => this.onLanguageChange("english")} />
                    <i className="flag nl" onClick={() => this.onLanguageChange("dutch")} />
                </div>
                {/* For this simplistic app, we will just hardcode the color context. Possible values: 'primary' (blue in Semantic UI) and 'red' */}
                <ColorContext.Provider value="primary">
                    <LanguageContext.Provider value={this.state.language}>
                        <UserCreate />
                    </LanguageContext.Provider>
                </ColorContext.Provider>
            </div>
        );
    }
}

export default App;
