const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');

// Creates a client
const client = new vision.ImageAnnotatorClient();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */


function parseOutput(textDescriptors) {
  if(textDescriptors.length == 9 && parseInt(textDescriptors))
    return 1;
  return 0;
}

// Performs label detection on the image file
async function parseImage() {
  const fileName = '/Users/rahulnatarajan/Desktop/sour-patchd/backend/receipt.jpg';
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

async function compile() {
  images = await parseImage();
  console.log(images);
  queries = createQueries(images);
  console.log(queries);
  names = await getItemName(queries);
  console.log(names);
}

compile();
