import React from 'react';
import { connect } from 'react-redux';

const PlaylistEntry = (props) => (
  <div className="row">
    <h2>{props.Song.name}</h2>
  </div>
)

const mapDispatch = { };
export default connect(null, mapDispatch)(PlaylistEntry);