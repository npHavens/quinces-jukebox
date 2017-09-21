import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        Hello: {this.state.count}
      </button>
      <div>TEST</div>
      </div>

    );
  }
}
export default App;