import React from 'react';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Login = (props) => {
  const onChange = (event, index, user) => {
    props.onChange(user);
  };

  const menuItems = (users) => {
    return users.map((user) => (
      <MenuItem
        key={user._id}
        value={user.name}
        primaryText={user.name}
      />
    ));
  }
  return (
    <div>
    <SelectField
      hintText="Select a name"
      value={props.currentUser}
      onChange={onChange}
      >
      {menuItems(props.users)}
    </SelectField>
  </div>
  )
}

export default Login;