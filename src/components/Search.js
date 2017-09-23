import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SearchEntry from './SearchEntry';

import onSearch from '../redux/reducer';

class Search extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <TextField/>
        <FlatButton label="Search" onClick={() => {onSearch('puppies')}}/>
        <div>
        {/* {
        this.props.results && this.props.results.map((result) => {
          return (
            <SearchEntry Result={result}/>
          )
        })
      } */}
      </div>
     </div>
    )
  }
}

const mapDispatch = {onSearch};
export default connect(null, mapDispatch)(Search);