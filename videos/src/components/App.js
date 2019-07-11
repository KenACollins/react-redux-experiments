import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        // Load screen with results of a default initial search so user does not see 'Loading...' lingering forever when no search has been performed.
        this.onSearchSubmit('buildings');
    }

    onSearchSubmit = async term => {  
        const response = await youtube.get('/search', {
            params: { 
                q: term 
            } 
        });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]   // When we do a search, default selection to the first one.
        });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };

    render() {
       return (
           <div className="ui container">
               <SearchBar onFormSubmit={this.onSearchSubmit} />
               <div className="ui grid">
                   <div className="ui row">
                       <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                       </div>
                       <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                       </div>
                   </div>
               </div>
            </div>
       ); 
    }
}

export default App;