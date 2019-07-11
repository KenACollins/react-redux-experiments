import axios from 'axios';
const KEY = 'AIzaSyCMo7gSnJPg_Tr5aF6T4306vKeNPYNNZAM';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key:KEY
    }
});