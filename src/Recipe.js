import React from 'react';
//import logo from './logo.svg';
import './Recipe.css';

function Recipe(props) {
  return (<div className="recipe-container">
    <h3>{props.name}</h3>
  </div>);
}

export default Recipe;
