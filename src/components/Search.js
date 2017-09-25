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
    this.onAdd = this.onAdd.bind(this);
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

  onAdd(song) {
    console.log(song);
    let newSong = {};
    newSong.name = song.name;
    // newSong.upVoteCount = 1;
    // newSong.downVoteCount = 0;
    // newSong.netCount = 1;
    newSong.image = song.album.images[2].url;
    newSong.link = song.album.external_urls.spotify;
    axios.post('/songs', newSong)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(error);
    });
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
            <SearchEntry onAdd={this.onAdd} Result={result}/>
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