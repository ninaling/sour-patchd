const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

// Creates a client
const client = new vision.ImageAnnotatorClient();

function parseOutput(textDescriptors) {
  if(textDescriptors.length == 9 && parseInt(textDescriptors))
    return 1;
  return 0;
}

// Performs label detection on the image file
async function parseImage() {
  const fileName = '/Users/Saquib/Desktop/test1.jpg';
  let rdci_codes = [];

  try {
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    detections.forEach(text => {
      if(parseOutput(text.description))
        rdci_codes.push(text.description);
    });
  } catch(error){
    console.log(error)
    return
  }

  return rdci_codes;
}

function reformat_rdci(original_rdci) {
  return original_rdci.substring(0, 3) + '-'
  + original_rdci.substring(3,5) + '-'
  + original_rdci.substring(5);
}

function createQueries(rdci_codes) {
  listOfQueries = [];

  query = {
    'web_name': 'https://brickseek.com/target-inventory-checker/',
    'item': '?sku=',
  };

  var i;
  for(i = 0; i < rdci_codes.length; i++) {
    listOfQueries.push({
      'web_name': this.query['web_name'],
      'item': this.query['item'] + reformat_rdci(rdci_codes[i])
    });
  }

  return listOfQueries;
}

async function getItemName(listOfQueries) {
  var i;
  let devtoList = [];
  for(i = 0; i < listOfQueries.length; i++) {
    try {
      const result = await axios.get(listOfQueries[i]['web_name'] + listOfQueries[i]['item']);
      const html = result.data;
      const $ = cheerio.load(html);
      $('.page').each(function(i, elem) {
        devtoList.push($(this).find('h2').text().trim());
      });
    } catch(error){
      console.log(error)
    }
  }
  return devtoList;
}

async function isInDictionary(word) {
  try {
    result = await unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
    .header("X-Mashape-Key", "63b974140fmsh6c4b67feecef3cbp12a7edjsnaf936681e241")
    .header("Accept", "application/json");
  } catch(error) {
    console.log(error);
  }

  if(result.body['results'] != null)
    return true;
  return false;
}

async function partOfSpeechAnalysis(word) {
  var result;
  try {
    result = await unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
    .header("X-Mashape-Key", "63b974140fmsh6c4b67feecef3cbp12a7edjsnaf936681e241")
    .header("Accept", "application/json");
  } catch(error) {
    console.log(error);
  }

  return result.body['results'][0]['partOfSpeech'];
}

function charParser(word) {
  word = word.replace(',', '');
  word = word.replace('!', '');
  word = word.replace('.', '');
  word = word.replace('<', '');
  word = word.replace('>', '');
  word = word.replace('?', '');
  word = word.replace('&', '');
  word = word.replace('*', '');
  word = word.replace('@', '');
  word = word.replace('+', '');
  word = word.replace("  ", ' ');
  return word;
}

async function compile() {
  images = await parseImage();
  queries = createQueries(images);
  names = await getItemName(queries);
  var i;
  let parsedNames = [];
  for(i = 0; i < names.length; i++) {
    parsedNames.push(charParser(names[i].split('-')[0]));
  }

  var j;
  for(i = 0; i < parsedNames.length; i++) {
    words = parsedNames[i].split(' ');
    finishedString = '';
    var j;
    for(j = 0; j < words.length; j++) {
      inDict = await isInDictionary(words[j]);
      if(inDict) {
        partOfSpeech = await partOfSpeechAnalysis(words[j]);
        if(partOfSpeech != 'adjective') {
          finishedString = finishedString + words[j] + ' ';
        }
      }
    }
    parsedNames[i] = (finishedString.toLowerCase()).substring(0, finishedString.length-1);
  }

  return parsedNames;
}

module.exports = compile;
