import React from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getAllSongs } from '../redux/reducer';
import PlaylistEntry from './PlaylistEntry';

import Player from './Player.js';


class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      hostSession: false
    }
    this.getAllSongs = this.getAllSongs.bind(this);
    this.upVote = this.upVote.bind(this);
  }
  componentDidMount() {
    this.getAllSongs();
  }

  getAllSongs() {
    axios.get(`/songs`)
    .then((response) => {
      console.log(response);
      this.setState({ songs: response.data})
      this.checkUser();
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  upVote(song) {
    // need to check if song as already been voted
    // on by person
    song.upVoteCount++;
    axios.put('/song', song)
    .then((response) => {
      this.getAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  checkUser() { //check if host is logged in
    const url = window.location.href;
    if (url.indexOf('#access_token') > -1) {
      this.setState({hostSession: true});
    }
  }

  render() {
      return (
        <div>
        {//only render player if host is logged in
          this.state.hostSession && this.state.songs.length > 1
          ? <Player songs={this.state.songs}/>
          : <div></div>}
        {
          this.state.songs && this.state.songs.map((song) => {
            return (
              <PlaylistEntry upVote={this.upVote} Song={song} />
            )
          })
        }
        </div>
      )
  }
}

export default Playlist;
// REDUX CODE
// const mapState = ({songs}) => ({songs});
// const mapDispatch = {getAllSongs};
// export default connect(mapState, mapDispatch)(Playlist);