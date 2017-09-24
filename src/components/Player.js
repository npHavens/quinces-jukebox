import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      <iframe src="https://open.spotify.com/embed?uri=spotify:track:54X78diSLoUDI3joC2bjMz" width="300" height="380" ></iframe>
      </div>
    )
  }
}

export default Player;