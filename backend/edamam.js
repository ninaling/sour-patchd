var buildUrl = require('build-url');
// var request = require('request');
const axios = require('axios');

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

function idk(ingredients){
  return recipe(ingredients);
}

var ingredients = ["beef", "chicken"];
console.log(idk(ingredients));

idk(ingredients)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
