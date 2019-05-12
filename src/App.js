import React from 'react';
import logo from './assets/logo-navy.png';
import './App.css';
import Recipe from './Recipe';

var recipes = [
  {"name": "Chocolate Chip Cookies", "ingredients": ["Flour", "Butter", "Chocolate"], "ingredientsNeeded": ["Sugar"]},
  {"name": "Snickerdoodles", "ingredients": ["Flour", "Butter", "Cinnamon"], "ingredientsNeeded": []}
];

var homeScreen = <div className="App">
    <div className="App-header">
      <h1 id="homepage-title">
        Welcome to Sour Patch'd.
      </h1>
      <div>
        Get Started:
        <form id="homepage-button-container">
          <input type="file" name="pic" accept="image/*" className="homepage-button"/>
          <input type="submit" className="homepage-button"/>
        </form>
      </div>
    </div>
  </div>;

var homeScreen2 = <div className="App">
    <div className="recipe-display">
      <h6>You just got sour patch'd!</h6>
      <h1>Available Recipes</h1>
      {recipes.map((item, index) => (
        <Recipe key={item.index} name={item.name} ingredients={item.ingredients} ingredientsNeeded={item.ingredientsNeeded}/>
      ))}
    </div>
  </div>;

function App() {
  return ([<nav id="nav-bar">
      <a><img src={logo}/></a>
    </nav>,
    homeScreen]);
}

export default App;
