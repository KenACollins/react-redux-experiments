import { combineReducers } from 'redux';

// Songs list reducer (actually a static, unchanging list).
// I did a Google search of "80s songs" and got a list but it did not include durations so I made them up.
const songsReducer = () => {
    return [
        { title: "Every Breath You Take", duration: "4:40" },
        { title: "Sweet Child O' Mine", duration: "3:59" },
        { title: "When Doves Cry", duration: "5:00" },
        { title: "Jump", duration: "3:30" },
    ];
};

// Reducer returns newly selected song. All other times it returns currently selected song.
const selectedSongReducer = (selectedSong = null, action) => {
    if (action.type === 'SONG_SELECTED') {
        return action.payload;
    }
    return selectedSong;
};

// We got combineReducers from our import statement, we did not invent this name.
export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});