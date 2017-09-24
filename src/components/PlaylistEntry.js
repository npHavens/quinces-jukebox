import React from 'react';
// import { connect } from 'react-redux';
// import { onUpVote } from '../redux/reducer';

const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  }

  const handleDownVote = () => {

  }
  return (
    <div className="row">
      <button onClick={handleUpVote}>+</button>
      <h2>{props.Song.name}</h2>
      <p>{props.Song.upVoteCount}</p>
      <p>{props.Song.downVoteCount}</p>
    </div>
  )
}

export default PlaylistEntry;
// REDUX CODE
// const mapDispatch = {onUpVote};
// export default connect(null, mapDispatch)(PlaylistEntry);