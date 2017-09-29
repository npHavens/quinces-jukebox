import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Playlist from './Playlist';
import Signup from './Signup';
import Login from './Login';
import Search from './Search';


class Container extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <div>
          <Route exact path='/' component={Playlist}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/search' component={Search}/>
          </div>
        </Switch>
      </MuiThemeProvider>
    )
  }
}
export default Container;