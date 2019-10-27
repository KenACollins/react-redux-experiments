import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
    if (!song) {
        return <div>Select a song.</div>
    }
    return (
        <div>
            <h3>Details for:</h3>
            <p>
                Title: {song.title}
                <br />
                Duration: {song.duration}
            </p>
        </div>
    );
};

// Returns an object of the filtered state that SongDetail needs.
// We can name property anything we want (here 'song'). Value matches state property of combineReducers output.
const mapStateToProps = state => {
    return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);