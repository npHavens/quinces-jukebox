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
    console.log(this.state.currentSongId)
    this.getSpotifyToken();
    this.getDeviceId();
  }

  getSpotifyToken() {
    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    var params = getHashParams();

    var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;

    spotifyApi.setAccessToken(access_token);
    return access_token;
  }

  getDeviceId() {
    spotifyApi.getMyDevices()
      .then(function(data) {
        this.playCurrentSong(data.devices[0].id);
      }.bind(this), function(err) {
        console.error(err);
      });
  }

  playCurrentSong(deviceId) {
    spotifyApi.play({device_id: deviceId, uris: ['spotify:track:' + this.state.currentSongId]})
      .then(function(data) {
       }.bind(this), function(err) {
         console.error(err);
    });
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