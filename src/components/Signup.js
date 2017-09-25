import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const Signup = (props) => (
  <div>
    <TextField hintText="Username"/>
    <br />
    <br />
    <TextField hintText="Password"/>
    <FlatButton label="Sign Up" />
  </div>
)

export default Signup;