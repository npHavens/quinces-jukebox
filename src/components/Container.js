import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Playlist from './Playlist';
import Signup from './Signup';
import Login from './Login';
import Search from './Search';


const Container = () => (
    <main>
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={Playlist}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/search' component={Search}/>
        </Switch>
      </MuiThemeProvider>
    </main>
)

export default Container;