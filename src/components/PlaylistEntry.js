import React from 'react';
// import { connect } from 'react-redux';
// import { onUpVote } from '../redux/reducer';
import {GridList, GridTile} from 'material-ui/GridList';

const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  }

  const handleDownVote = () => {
    props.downVote(props.Song);
  }

  const handleSongClick = () => {
    props.handlePlay(props.Song);
  }

  return (
    <div className="row" onClick={handleSongClick}>
      <button onClick={handleUpVote}>+</button>
      <button onClick={handleDownVote}>-</button>
      <h2>{props.Song.name}</h2>
      {/* <GridTile
      title={props.Song.name}
      >
      </GridTile> */}

      <p>{props.Song.upVoteCount}</p>
      <p>{props.Song.downVoteCount}</p>
      <p>{props.Song.netVoteCount}</p>
    </div>
  )
}

export default PlaylistEntry;
// REDUX CODE
// const mapDispatch = {onUpVote};
// export default connect(null, mapDispatch)(PlaylistEntry);