import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: this.props.song.link.split('track/')[1]
    }
  }

  componentDidMount() {
    this.getSpotifyToken();
    this.getDeviceId(this.playCurrentSong.bind(this));
  }

  //synchronous function that gets token values from url parameters
  getSpotifyToken() {
    const getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g;
    let q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
      return hashParams;
    }

    const params = getHashParams();
    const access_token = params.access_token;
    const refresh_token = params.refresh_token;

    spotifyApi.setAccessToken(access_token);
    return access_token;
  }

  getDeviceId(cb) {
    console.log('getting device id')
    spotifyApi.getMyDevices()
      .then((data) => {
        cb(data.devices[0].id);
      }, (err) =>{
        console.error(err);
      });
  }

  playCurrentSong(deviceId) {
    console.log('playing song')
    spotifyApi.play({device_id: deviceId, uris: ['spotify:track:' + this.state.currentSongId]})
      .then(function(data) {
       }.bind(this), function(err) {
         console.error(err);
    });
  };

  getCurrentSongTime(cb) {
    spotifyApi.getMyCurrentPlayingTrack()
    .then(song => {
      let timeLeft = song.item.duration_ms - song.progress_ms;
      console.log(timeLeft)
    })
  }

  render() {
    return (
      <div>
      <iframe src={'https://open.spotify.com/embed?uri=spotify:track:' + this.state.currentSongId} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
      </div>
    )
  }
}

export default Player;