var buildUrl = require('build-url');
// var request = require('request');
const axios = require('axios');
const compile = require('./text_classify.js');

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

  shortened_recipes = [];

  try{
    const result = await axios.get(query_url);
    // console.log(result.data.hits)
    // recipes = JSON.parse(result.data);
    var recipes = result.data.hits;

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

    // console.log(shortened_recipes)
    return shortened_recipes;

  }
  catch(error) {
    console.log(error);
    return
  }


  // GET request from Edamam
  request(query_url, function (error, response, body) {

    if(error != null){
      console.log('error:', error); // Print the error if one occurred
    }

    console.log('statusCode:', response.statusCode); // Print the response status code if a response was received

    recipes = JSON.parse(response.body);

    // parse response
    shortened_recipes = [];
    for(var i = 0; i < recipes.hits.length; i++){
      var curr_recipe = recipes.hits[i].recipe;

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

    // console.log(shortened_recipes)
    return shortened_recipes;
  });
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

async function idk(ingredients){
  return recipe(ingredients);
}

async function idk2(){
  result = ['good foods guacamole', 'natures own honey wheat bread products', 'clementines'];

  final_items = [];
  for(var i = result.length - 1; i >= 0; i--){
    var curr_item = result[i];
    // console.log(curr_item)
    potential_ings = curr_item.split(" ");
    final_items.push(potential_ings[0]);
  }

  try {
    recipes = await idk(final_items);
    return recipes;
  } catch(error) {
    console.log(error);
  }
  /*idk(final_items)
    .then((result) => {
      // console.log(result)
      return result;
    })
    .catch((error) => {
      console.log(error);
    })*/
}

async function idk3() {
  plzwork = await idk2();
  console.log(plzwork);
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
