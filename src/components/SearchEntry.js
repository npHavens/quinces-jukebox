import React from 'react';
import { connect } from 'react-redux';


const SearchEntry = (props) => (
  <div>
   <p>{props.Result.name}</p>
  </div>
)

const mapDispatch = {};
export default connect(null, mapDispatch)(SearchEntry);