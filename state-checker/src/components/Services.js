import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div>
            <h4>This is the services page.</h4>
            <Link to="/" className="linkButton">Return to Home page</Link>
            <style>{`
                    .linkButton {
                        text-decoration: none;
                        border: solid 1px;
                        border-radius: 5px;
                        padding: 5px;
                    }
                `}</style>
        </div>
    );
};

export default Services;