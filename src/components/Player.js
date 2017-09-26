import React from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: '54X78diSLoUDI3joC2bjMz'
    }
  }

  componentDidMount() {
    //console.log(this.props.songs)
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

    //console.log(access_token);
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
        console.log('playing on device', deviceId)
       }.bind(this), function(err) {
         console.error(err);
    });
  }

  render() {
    return (
      <div>
      <img src="https://i.scdn.co/image/b06f26ee223372607bf0be8188cf94ffe0704bd6" height="150" width="150"/>
      </div>
    )
  }
}

export default Player;