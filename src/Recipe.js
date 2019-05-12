import React from 'react';
//import logo from './logo.svg';
import './Recipe.css';

function getIngredientsList(arr) {
  if (arr.length === 0) { return "N/A"; }
  else return arr.join(', ')
}

function Recipe(props) {
  return (<a class="recipe-link" href={props.url} target="_blank" rel="noopener noreferrer">
    <div className="recipe-container">
      <h3 className="recipe-title">{props.name}</h3>
      <div className="recipe-body">
        <h4>Ingredients you have:</h4>
        <p>{getIngredientsList(props.ingredients)}</p>
        <h4>Ingredients you need:</h4>
        <p>{getIngredientsList(props.ingredientsNeeded)}</p>
      </div>
    </div>
  </a>);
}

export default Recipe;
