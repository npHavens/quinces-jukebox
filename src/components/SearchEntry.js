import React from 'react';
import { connect } from 'react-redux';


const SearchEntry = (props) => {
  const clickHandler = () => {
    props.onAdd(props.Result);
  }
  return(
    <div>
      <button onClick={clickHandler}>+</button>
      <p>{props.Result.name}</p>
      <p>{props.Result.artists[0].name}</p>
    </div>
  )
}

export default SearchEntry;