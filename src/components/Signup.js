import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const Signup = () => (
  <div>
    <TextField hintText="Email Address"/>
    <br />
    <br />
    <TextField hintText="Password"/>
  </div>
)

export default Signup;