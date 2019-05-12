import React from 'react';
import logo from './assets/logo-navy.png';
import './App.css';
import Recipe from './Recipe';
import Form from './Form';

var recipesTemp = [
  {"name": "Chocolate Chip Cookies", "ingredients": ["Flour", "Butter", "Chocolate"], "ingredientsNeeded": ["Sugar"]},
  {"name": "Snickerdoodles", "ingredients": ["Flour", "Butter", "Cinnamon"], "ingredientsNeeded": []}
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       recipes: [],
       receiptProcessed: false
    }
  }

  returnToHome() {
    this.setState({recipes: [], receiptProcessed: false});
  }

  // temporary, used for testing
  recipesTempFill() {
    this.setState({recipes: recipesTemp, receiptProcessed: true});
  }

  getHomeScreen() {
    return (<div className="App">
      <div className="App-header">
        <h1 id="homepage-title">
          Welcome to Sour Patch'd.
        </h1>
        <div id="homepage-upload">
          <p>Get Started by uploading a receipt:</p>
          <Form/>
          {/* temporary button for testing purposes */}
          <button onClick={() => {this.recipesTempFill()}}>temp</button>
        </div>
      </div>
    </div>);}

  getRecipeDisplay() {
    return (<div className="App">
      <div className="recipe-display">
        <h6>You just got sour patch'd!</h6>
        <h1>Available Recipes</h1>
        {this.state.recipes.map((item, index) => (
          <Recipe key={item.index} name={item.name} ingredients={item.ingredients} ingredientsNeeded={item.ingredientsNeeded}/>
        ))}
      </div>
    </div>);}

  render() {
    const isReceiptProcessed = this.state.receiptProcessed;
    let display;
    if (isReceiptProcessed) display = this.getRecipeDisplay();
    else display = this.getHomeScreen();
    return (
      <div>
        <nav id="nav-bar">
          <button onClick={() => {this.returnToHome()}}><img src={logo}/></button>
        </nav>
        {display}
      </div>);}
}

export default App;

// <form id="homepage-button-container">
//   <input type="file" name="pic" accept="image/*" className="homepage-button"/>
//   <input type="submit" className="homepage-button"/>
// </form>
