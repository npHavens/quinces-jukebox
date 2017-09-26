import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { auth } from '../../helpers/auth';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange(e) {
    let newState = {};

    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  signUp(e) {
    auth(this.state.email, this.state.password)
      .catch(e => {
        console.log(e);
        return;
      })
    let newUser = {};
    newUser.username = this.state.username;
    newUser.password = this.state.password;
    axios.post('/signup', newUser)
    .then((response) => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div>
        <TextField onChange={this.handleChange} name="username" value={this.state.username} hintText="Username"/>
        <br />
        <br />
        <TextField onChange={this.handleChange} name="password" value={this.state.password} hintText="Password"/>
        <FlatButton onClick={this.signUp} label="Sign Up" />
    </div>
    )
  }
}

export default Signup;