import React from 'react';
import { connect } from 'react-redux';
import { getAllSongs } from '../redux/reducer';
import PlaylistEntry from './PlaylistEntry';
import sampleData from '../lib/sampleData';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    console.log(sampleData.tracks.items)
    getAllSongs();
  }

  render() {
      return (
        <div>
        {
          this.props.songs && this.props.songs.map((song) => {
            return (
              <PlaylistEntry Song={song}/>
            )
          })
        }
        </div>
      )
  }
}

const mapState = ({songs}) => ({songs});
const mapDispatch = {getAllSongs};
export default connect(mapState, mapDispatch)(Playlist);