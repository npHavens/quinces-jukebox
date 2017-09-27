import React from 'react';


const spotifyApi = new SpotifyWebApi();

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: this.props.song.link.split('track/')[1]
    }
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