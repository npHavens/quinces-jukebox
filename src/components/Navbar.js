import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <div>
    <AppBar
      title="Quinces JukeBox"

      iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
    />
    <ul>
      <li><Link to="/">Playlist</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><a href="http://localhost:3000/hostLogin">Login as Host</a></li>
    </ul>
  </div>
)

export default Navbar;