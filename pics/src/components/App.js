/** 
 * This app allows a user to enter a search term and get back a screen filled with a fixed set of images (limit of 10 based on API default setting)
 * that will be displayed in a tight grid, where all images are limited in width (250px set in CSS) but can vary in height. There is no mechanism
 * for retrieving more images for a given search term so if you search on cars, you will always get back the same set of car images. Entering a new
 * search term wipes out the images from the previous search.
*/
import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

class App extends React.Component {
    state = { images: [] };

    onSearchSubmit = async term => {    
        const response = await unsplash.get('/search/photos', {
            params: { query: term },
        });
        
        // New search always replaces images from previous search.
        this.setState({ images: response.data.results });
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <ImageList images={this.state.images} />
            </div>
        );
    }
}

export default App;