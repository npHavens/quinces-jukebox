import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    zIndex: '1'
  }

  return (
    <div>
      <AppBar
        title="Quinces JukeBox"
        style={navbarStyle}
        iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
      />
      <ul>
        <li><Link to="/">Playlist</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><a href="/hostLogin">Login as Host</a></li>
      </ul>
    </div>
  )
}

export default Navbar;