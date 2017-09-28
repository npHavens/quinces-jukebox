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
      currentUser: ''
    }
    this.getAllUsers = this.getAllUsers.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }


  handleChange (event, index, user){
    this.setState({currentUser: user});
  };

  menuItems(users) {
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

  onClick() {
    this.props.history.push({
      pathname: '/',
      state: { currentUser: this.state.currentUser }
    })
  }

  render() {
    return (
      <div>
        <h1>login component</h1>
        <SelectField
          hintText="Select a name"
          value={this.state.currentUser}
          onChange={this.handleChange}
          >
          {this.menuItems(this.state.users)}
        </SelectField>
        <button onClick={this.onClick}>login</button>
      </div>
    )
  }
}

export default Login;