import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Services from './Services';
import Landing from './Landing';

class App extends Component {
    state = { color: 'red' };

    componentWillUnmount = () => {
        console.log('Oops! The App component is about to lose state!');
    };

    toggleBoxColor = () => {
        if (this.state.color === 'red') { this.setState({ color: 'purple' }); }
        else { this.setState({ color: 'red' }); }
    }

    setBox = () => {
        if (this.state.color === 'red') { return 'red box' }
        else { return 'purple box' }
    }

    render() {
        return (
            <>
                <div>
                    <button onClick={this.toggleBoxColor}>Toggle Box Color</button>
                    <div className={this.setBox()}></div>
                </div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/services" component={Services} />
                    </div>
                </BrowserRouter>
                <style>{`
                    button {
                        color: purple;
                        background-color: white;
                        border: solid 1px;
                        border-radius: 5px;
                        padding: 5px;
                    }
                    .box {
                        margin-top: 10px;
                        margin-bottom: 20px;
                        width: 50px;
                        height: 50px;
                    }
                    .red {
                        background-color: red;
                    }
                    .purple {
                        background-color: purple;
                    }
                `}</style>
            </>
        );
    }
}

export default App; 
