import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import Form from './Form';

var recipes = [
  {"name": "Chocolate Chip Cookies", "ingredients": ["Flour", "Butter", "Chocolate"]},
  {"name": "Snickerdoodles", "ingredients": ["Flour", "Butter", "Cinnamon"]}
];

var homeScreen = <div className="App">
    <div className="App-header">
      <h1>
        Welcome to Sour Patchd.
      </h1>
      <div>
        Get Started:
        <Form/>
      </div>
    </div>
  </div>;

var homeScreen2 = <div className="App">
    <div className="recipe-display">
      <h1>Available Recipes</h1>
      {recipes.map((item, index) => (
        <Recipe name={item.name}/>
      ))}
    </div>
  </div>;

function App() {
  return homeScreen;
}

export default App;

// <form id="homepage-button-container">
//   <input type="file" name="pic" accept="image/*" className="homepage-button"/>
//   <input type="submit" className="homepage-button"/>
// </form>
