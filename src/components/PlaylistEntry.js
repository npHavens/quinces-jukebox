import React from 'react';
import { connect } from 'react-redux';
import { onUpVote } from '../redux/reducer';

const PlaylistEntry = (props) => {
  return (
    <div className="row">
      <button onClick={() => {
            props.onUpVote(props.Song)}}>+</button>
      <h2>{props.Song.name}</h2>
      <p>{props.Song.upVoteCount}</p>
      <p>{props.Song.downVoteCount}</p>
    </div>
  )
}

const mapDispatch = {onUpVote};
export default connect(null, mapDispatch)(PlaylistEntry);