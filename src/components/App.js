import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';

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
        <Navbar/>
        <Container/>
      </div>
    );
  }
}
export default App;