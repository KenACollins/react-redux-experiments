import './SeasonDisplay.css';
import React from 'react';

const seasonConfig = {
    summer: {
        message: "Let's hit the beach",
        iconName: 'sun'
    },
    winter: {
        message: "Brr it's chilly",
        iconName: 'snowflake'
    }
};

const getSeason = (lat, month) => {
    // If current month is between April and September...
    // Note: latitude greater than 0 means we are in the northern hemisphere.
    if (month > 3 && month < 10) {
        return (lat > 0) ? 'summer' : 'winter';
    }
    else {
        return (lat > 0) ? 'winter' : 'summer';
    }
}

const SeasonDisplay = props => {
    const season = getSeason(props.lat, new Date().getMonth() + 1);
    const { message, iconName } = seasonConfig[season];

    return (
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive ${iconName} icon`} />
            <h1>{message}</h1>
            <i className={`icon-right massive ${iconName} icon`} />
        </div>
    );
};

export default SeasonDisplay;