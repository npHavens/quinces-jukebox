import axios from "axios";
import sampleData from '../lib/sampleData';

/////////////////CONSTANTS/////////////////////
const GET_ALL_SONGS = "GET_ALL_SONGS";
const INCREMENT = "INCREMENT";

/////////////////ACTIONS//////////////
const getSongs = (songs) => {
  return {
    type: 'GET_ALL_SONGS',
    songs
  }
};

// const upVoteSong = (song) => {
//   return {
//     type: INCREMENT,
//     song
//   }
// }

/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
  songs: sampleData.tracks.items
};

const reducer = (state = initial, action) => {

  switch (action.type) {
    case 'GET_ALL_SONGS':
      return Object.assign({}, state, {songs: action.songs.objects});
    // case INCREMENT:
    //   return state.map(song =>
    //     (todo.id === action.id) 
    //       ? {...song, upVoteCount: upVoteCount++}
    //       : todo
    //   )
    default:
      return state;
  }
};

export default reducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getAllSongs = () => dispatch => {
  // axios.get(`localhost:3000/songs`)
  //   .then((response) => {
  //     return response.data.tracks.items;
  //   })
  //   .then((songs) => {
  //     dispatch(getSongs(songs))
  //   })
  //   .catch((err) => {
  //     console.error.bind(err);
  //   })
};

export const onUpVote = (song) => dispatch => {
  console.log('hello');
}
