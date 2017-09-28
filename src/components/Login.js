import React from 'react';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      items: [],
      user:''
    }
    this.getAllUsers = this.getAllUsers.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.handleChange = this.handleChange.bind(this); 
  }

  componentDidMount() {
    this.getAllUsers();
  }

  handleChange (event, index, user){
    this.setState({user});
  };

  menuItems(users) {
    console.log(users);
    return users.map((user) => (
      <MenuItem
        key={user._id}
        value={user.name}
        primaryText={user.name}
      />
    ));
  }

  getAllUsers() {
    axios.get(`/users`)
    .then((response) => {

      this.setState({
       users: response.data
      })
    })
    .catch((err) => {
      console.error.bind(err);
    })
  }

  render() {
    return (
      <div>
        <h1>login component</h1>
        <SelectField
          hintText="Select a name"
          value={this.state.user}
          onChange={this.handleChange}
          >
          {this.menuItems(this.state.users)}
        </SelectField>
      </div>
    )
  }
}

export default Login;