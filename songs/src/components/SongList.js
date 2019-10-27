import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component {
    renderList() {
        return this.props.songs.map(song => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button
                            className="ui button primary"
                            onClick={() => this.props.selectSong(song)}
                        >Select</button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="ui divided list">{this.renderList()}</div>
        );
    }
}

// Returns an object of the filtered state that SongList needs. 
// We can name property anything we want (here 'songs'). Value matches state property of combineReducers output.
const mapStateToProps = (state) => {
    return { songs: state.songs };
};

// We pass selectSong action creator to connect() as second parameter in form of an object
// { selectSong: selectSong } then reduce the syntax since property and value are the same. 
export default connect(mapStateToProps, { selectSong })(SongList);


