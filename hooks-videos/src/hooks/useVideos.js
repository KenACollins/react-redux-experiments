// Custom hook that will return an array with a list of videos and a function to search for videos.
// Having a default search term was fine in original app, but not okay here.
import { useState, useEffect } from 'react';
import youtube from '../apis/youtube';

const useVideos = (defaultSearchTerm) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        search(defaultSearchTerm);
    }, [defaultSearchTerm]);    // Add defaultSearchTerm here to avoid 'React hook has missing dependency' warning.

    const search = async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });

        setVideos(response.data.items);
    };

    return [videos, search];
};

export default useVideos;