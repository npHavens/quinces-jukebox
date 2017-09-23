import axios from "axios";
import sampleData from '../lib/sampleData';

/////////////////CONSTANTS/////////////////////
const GET_ALL_SONGS = "GET_ALL_SONGS";

/////////////////ACTIONS//////////////
const getSongs = (songs) => ({type: GET_ALL_SONGS, songs});

/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
  songs: sampleData.tracks.items
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_SONGS:
      return Object.assign({}, state, {songs: action.songs.objects});
    default:
      return state;
  }
};

export default reducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getAllSongs = () => dispatch => {
  console.log('hello world');
  let songs = sampleData.tracks.items
  console.log(songs);
  dispatch(getSongs(songs));
  // axios.get(`insert request link here`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .then((songs) => {
  //     dispatch(getSongs(songs))
  //   })
  //   .catch((err) => {
  //     console.error.bind(err);
  //   })
};
