import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SearchEntry from './SearchEntry';

import onSearch from '../redux/reducer';

class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSearch(query){

    axios.get('/songs/search', {
      params: {
        query: this.state.query
      }
    })
    .then((response) => {
      this.setState({ results: response.data.tracks.items})
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  onChange(e) {
    let query = e.target.value;
    this.setState({query:query});
  }

  render() {
    return (
      <div>
        <TextField onChange={this.onChange}/>
        <button onClick={this.onSearch}>search</button>
        <div>
        {
        this.state.results && this.state.results.map((result) => {
          return (
            <SearchEntry Result={result}/>
          )
        })
      }
      </div>
     </div>
    )
  }
}

const mapDispatch = {onSearch};
export default connect(null, mapDispatch)(Search);