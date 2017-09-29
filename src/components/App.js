import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import Container from './Container';
import Banner from './Banner';

/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  signUp(username, password) {
    console.log(username, password);
  }

  render() {
    return (
      <div>
        <Banner/>
        <MuiThemeProvider>
          <Navbar/>
        </MuiThemeProvider>
        <Container/>
      </div>
    );
  }
}
export default App;