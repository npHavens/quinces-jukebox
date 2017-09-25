import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <div>
    <ul>
      <li><Link to="/">Playlist</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><a href="/hostLogin">Login as Host</a></li>
    </ul>
  </div>
)

export default Navbar;