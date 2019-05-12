var buildUrl = require('build-url');
var request = require('request');

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
function recipe(ingredients){

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

      shortened_recipes.push({
        label: curr_recipe.label,
        calories: curr_recipe.calories,
        totalTime: curr_recipe.totalTime,
        url: curr_recipe.url,
        ingredientLines: curr_recipe.ingredientLines
      });
    }

    return shortened_recipes;
  });
}

var c = recipe(["beef", "chicken"]);
console.log(c);
