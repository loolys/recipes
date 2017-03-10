import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import FlashMessageList from './flash/FlashMessageList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <SearchBar />
        <FlashMessageList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
