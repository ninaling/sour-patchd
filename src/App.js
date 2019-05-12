import React from 'react';
//import logo from './logo.svg';
import './App.css';

var homeScreen = <div className="App">
  <header className="App-header">
    <h1>
      Welcome to Sour Patchd.
    </h1>
    <div>
      Get Started:
      <form id="homepage-button-container">
        <input type="file" name="pic" accept="image/*" className="homepage-button"/>
        <input type="submit" className="homepage-button"/>
      </form>
    </div>
  </header>
</div>;

function App() {
  return homeScreen;
}

export default App;
