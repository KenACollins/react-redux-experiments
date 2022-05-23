import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

    // Just to illustrate that this component will go away when we move to services page.
    componentWillUnmount = () => {
        console.log('Unloading Landing page...');
    };

    render() {
        return (
            <>
                <div>
                    <h1>Welcome to our App!</h1>
                    <Link to="/services" className="linkButton">Take me to Services page</Link>
                </div>
                <style>{`
                    .linkButton {
                        color: darkblue;
                        text-decoration: none;
                        border: solid 1px;
                        border-radius: 5px;
                        padding: 5px;
                    }
                `}</style>
            </>
        );
    }
}

export default Landing;