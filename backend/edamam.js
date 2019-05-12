var buildUrl = require('build-url');
// var request = require('request');
const axios = require('axios');
const compile = require('./text_classify.js');
const unirest = require('unirest');

function createPath(){
  return buildUrl('https://api.edamam.com', {
    path: 'search',
    queryParams: {
      q: '',
      app_id: '75b16e35',
      app_key: '96c4d4b9393680b61c02a15ef2754968',
      from: '0',
      to: '3',
      calories: '591-722',
      health: 'alcohol-free'
    }
  });
}

//
// ingredients is an array of strings
// returns list of recipes that contain the ingredients
//
async function recipe(ingredients){

  // at least one ingredient string must be passed in
  if(ingredients.length <= 0){
    console.log("no ingredients specified")
    return [];
  }

  // add commas between ingredients
  var qParam = "";
  for(var i = 0; i < ingredients.length; i++){
    qParam += (ingredients[i] + ",");
  }

  qParam = 'q=' + qParam.substring(0, qParam.length - 1);  // remove last comma

  // get API url
  var query_url = createPath(qParam);
  query_url = query_url.replace("q=", qParam);

  //console.log(query_url);

  shortened_recipes = [];

  try{
    const result = await axios.get(query_url);
    recipes = result.data.hits;
    // parse response

    for(var i = 0; i < recipes.length; i++){
      var curr_recipe = recipes[i].recipe;

      var ings = separate_ingredients(ingredients, curr_recipe.ingredientLines);

      shortened_recipes.push({
        label: curr_recipe.label,
        calories: curr_recipe.calories,
        totalTime: curr_recipe.totalTime,
        url: curr_recipe.url,
        haves: ings.haves,
        have_nots: ings.have_nots,
        ingredientLines: curr_recipe.ingredientLines
      });
    }

    return shortened_recipes;

  }
  catch(error) {
    console.log(error);
    return
  }
}

function separate_ingredients(ingredients, all){

  var haves = [];
  var have_nots = [];

  for(var i = 0; i < all.length; i++){
    for(var j = 0; j < ingredients.length; j++){
      if(all[i].includes(ingredients[j])){
        haves.push(all[i]);
        break;
      }
      else {
        have_nots.push(all[i]);
        break;
      }
    }
  }
  return {
    haves,
    have_nots
  }
}


async function recRecipe(ingredients, response) {
  try {
    response = await recipe(ingredients);
    //console.log(response);
    return response;
  } catch(error) {
    console.log(error);
  }
  return response
}

async function recipeParser(){
  //result = ['good foods guacamole', 'natures own honey wheat bread products', 'clementines'];
  result = ['good foods guacamole', 'natures own honey wheat bread products', 'clementines'];

  console.log(result);

  recipes = '';
  final_items = [];


  while(true) {
    if(result === []) {
      return;
    }
    last_item = result[result.length-1];
    final_items = [];
    for(var i = 0; i < result.length; i++){
      var curr_item = result[i];
      potential_ings = curr_item.split(" ");
      final_items.push(potential_ings[potential_ings.length-1]);
    }
    console.log(final_items);
    try {
      recipes = await recRecipe(final_items, recipes);
    } catch(error) {
      console.log(error);
    }
    if(recipes != '') {
      return recipes;
    }
    else {
      if(result[result.length-1].lastIndexOf(" ") === -1) {
        result.pop();
      }
      else {
        last_item = last_item.substring(0, last_item.lastIndexOf(" "));
        last_ind = last_item.split(" ");
        result[result.length-1] = last_ind[last_ind.length-1];
      }
    }
  }

  /*for(var i = 0; i < result.length; i++){
    var curr_item = result[i];
    potential_ings = curr_item.split(" ");
    final_items.push(potential_ings[potential_ings.length-1]);
  }

  console.log(final_items);

  try {
    recipes = await recipe(final_items);
    return recipes;
  } catch(error) {
    console.log(error);
  }*/
}

async function idk3() {
  plzwork = await recipeParser();
  //console.log(plzwork);
  return plzwork;
}

idk3();
// .then((result) => {
//   console.log(result);
// })
// .catch((error) => {
//   console.log(error);
// });

// console.log(final_items);
// for(var j = 0; j < potential_ings.length; j++){
//   try{
//     var a = await idk(ingredients)
//   }
//   catch(err){
//     console.log(err);
//     return
//   }
//
//   if(a.length > 0){
//     final_items.push(potential_ings[i]);
//   }
//
// }

// var ingredients = ["beef", "chicken"];

// idk(ingredients)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })

// compile()
//   .then((result) => {
//     for(var i = result.length - 1; i > 0; i--){
//       console.log(result[i]);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
