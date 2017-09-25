import React from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getAllSongs } from '../redux/reducer';
import PlaylistEntry from './PlaylistEntry';
import {GridList, GridTile} from 'material-ui/GridList';
import Player from './Player.js';


class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      currentSong: ''
    }
    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }
  componentDidMount() {
    this.getAllSongs();
  }

  getAllSongs() {
    axios.get(`/songs`)
    .then((response) => {
      this.setState({
        songs: response.data,
        currentSong: response.data[0]
      })
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  upVote(song) {
    // need to check if song as already been voted
    // on by person
    song.vote = 1;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  downVote(song) {
    // need to check if song as already been voted
    // on by person
    song.vote = -1;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
      return (
        <div>
          <Player song={this.state.currentSong}/>
        <GridList
        cellHeight={180}
        cols={1}
        >
        {
          this.state.songs && this.state.songs.map((song) => {
            return (

              <PlaylistEntry downVote={this.downVote} upVote={this.upVote} Song={song} />
            )
          })
        }
        </GridList>
        </div>
      )
  }
}

export default Playlist;
// REDUX CODE
// const mapState = ({songs}) => ({songs});
// const mapDispatch = {getAllSongs};
// export default connect(mapState, mapDispatch)(Playlist);