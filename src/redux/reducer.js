import axios from "axios";
import sampleData from '../lib/sampleData';

/////////////////CONSTANTS/////////////////////
const GET_ALL_SONGS = "GET_ALL_SONGS";
const INCREMENT = "INCREMENT";
const SEARCH = "SEARCH";

/////////////////ACTIONS//////////////
const getSongs = (songs) => {
  return {
    type: 'GET_ALL_SONGS',
    songs
  }
};

const upVoteSong = (song) => {
  return {
    type: INCREMENT,
    song
  }
}

const onSearchSong = (text) => {
  type: SEARCH

}

/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
  songs: sampleData.tracks.items,
  results: []
};

const reducer = (state = initial, action) => {

  switch (action.type) {
    case 'GET_ALL_SONGS':
      return Object.assign({}, state, {songs: action.songs});
    case INCREMENT:
      let newArr = state.songs.map((song) => {
        if(song.name === action.song.name) {
          song.upVoteCount++;
        }
        return song;
      });
      // return Object.assign({}, state, {songs: newArr});
    case SEARCH:
      return Object.assign({}, state, {results: action.results.objects});
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
  dispatch(upVoteSong(song));
  // axios.put('')
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .then((response) => {
  //     console.log(response)
  //   })
  //   .catch((err) => {
  //     console.error.bind(err);
  //   })
}

export const onSearch = (query) => dispatch => {
  axios.get('localhost:3000/songs/search')
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((results) => {
      dispatch(onSearchSong(results))
    })
    .catch((err) => {
      console.error.bind(err);
    })
}
