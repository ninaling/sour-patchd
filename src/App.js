import React from 'react';
import logo from './assets/logo-navy.png';
import bread from './assets/icons/bread.svg';
import lettuce from './assets/icons/lettuce.svg';
import cheese from './assets/icons/cheese.svg';
import steak from './assets/icons/steak.svg';
import avocado from './assets/icons/avocado.svg';
import fish from './assets/icons/fish.svg';
import veggie from './assets/icons/veggie.svg';
import watermelon from './assets/icons/watermelon.svg';
import egg from './assets/icons/egg.svg';
import milk from './assets/icons/milk.svg';
import './App.css';
import Recipe from './Recipe';
import Form from './Form';

var recipesTemp = [
  {"name": "Chocolate Chip Cookies", "ingredients": ["Flour", "Butter", "Chocolate"], "ingredientsNeeded": ["Sugar"], "url": ""},
  {"name": "Snickerdoodles", "ingredients": ["Flour", "Butter", "Cinnamon"], "ingredientsNeeded": [], "url": ""}
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       recipes: [],
       tempRecipes: [],
       receiptProcessing: false,
       receiptProcessed: false
    }

    this.recipesTempFill = this.recipesTempFill.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  returnToHome() {
    this.setState({recipes: [], receiptProcessed: false});
  }

  // temporary, used for testing
  recipesTempFill() {
    this.setState({recipes: recipesTemp, receiptProcessed: true});
  }

  // set receiptProcessing
  onFormSubmit(sub){
    // this.setState({receiptProcessing: sub})
    console.log(sub);
  }

  // get response from POST request
  getResponse(res){
    console.log(res);
    // this.setState({tempRecipes: res, recipes: [] receiptProcessed: false, receiptProcessing: true})
  }

  getHomeScreen() {
    return (<div className="App">
      <div className="App-header">
        <img className="food-icon" id="bread-icon" src={bread} alt="" />
        <img className="food-icon" id="lettuce-icon" src={lettuce} alt="" />
        <img className="food-icon" id="cheese-icon" src={cheese} alt="" />
        <img className="food-icon" id="steak-icon" src={steak} alt="" />
        <img className="food-icon" id="avocado-icon" src={avocado} alt="" />
        <img className="food-icon" id="fish-icon" src={fish} alt="" />
        <img className="food-icon" id="veggie-icon" src={veggie} alt="" />
        <img className="food-icon" id="watermelon-icon" src={watermelon} alt="" />
        <img className="food-icon" id="egg-icon" src={egg} alt="" />
        <img className="food-icon" id="milk-icon" src={milk} alt="" />
        <h1 id="homepage-title">
          Welcome to Sour Patch'd.
        </h1>
        <div id="homepage-upload">
          <p>Get started by uploading a receipt:</p>
          <Form response={this.getResponse} submitHandler={this.onFormSubmit}/>
          {/* temporary button for testing purposes */}
          <button onClick={() => {this.recipesTempFill()}}>temp</button>
        </div>
      </div>
    </div>);}

  getRecipeDisplay() {
    return (<div className="App">
      <div className="recipe-display">
        <img className="food-icon" id="bread-icon-rec" src={bread} alt="" />
        <img className="food-icon" id="lettuce-icon-rec" src={lettuce} alt="" />
        <img className="food-icon" id="cheese-icon-rec" src={cheese} alt="" />
        <img className="food-icon" id="steak-icon-rec" src={steak} alt="" />
        <img className="food-icon" id="avocado-icon-rec" src={avocado} alt="" />
        <img className="food-icon" id="fish-icon-rec" src={fish} alt="" />
        <h6>You just got sour patch'd!</h6>
        <h1>Available Recipes</h1>
        {this.state.recipes.map((item, index) => (
          <Recipe key={item.index} name={item.name} ingredients={item.ingredients} ingredientsNeeded={item.ingredientsNeeded} url={item.url}/>
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
          <button onClick={() => {this.returnToHome()}}><img src={logo} alt="logo"/></button>
        </nav>
        {display}
      </div>);}
}

export default App;

// <form id="homepage-button-container">
//   <input type="file" name="pic" accept="image/*" className="homepage-button"/>
//   <input type="submit" className="homepage-button"/>
// </form>
