import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessageList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <FlashMessageList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
