const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');

// Creates a client
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
  const client = new vision.ImageAnnotatorClient();
  const fileName = '/Users/rahulnatarajan/Desktop/sour-patchd/receipt.jpg';

  let rdci_codes = [];
  client
  .textDetection(fileName)
    .then(results => {
      const texts = results[0].textAnnotations;
      texts.forEach(text => {
        if(parseOutput(text.description))
          rdci_codes.push(text.description);
      });
      console.log(rdci_codes);
      //return rdci_codes;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function reformat_rdci(original_rdci) {
  return original_rdci.substring(0, 3) + '-' 
  + original_rdci.substring(3,5) + '-'
  + original_rdci.substring(5); 
}

function createQueries() { 
  listOfQueries = [];

  query = {
    'web_name': 'https://brickseek.com/target-inventory-checker',
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

function getItemName() {
  var i;
  for(i = 0; i < listOfQueries.length; i++) {
    axios(listOfQueries[i]['web_name'] + listOfQueries[i]['item'])
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];
            $('.page').each(function(i, elem) {
                devtoList[i] = {
                    name: $(this).find('h2').text().trim()
                }
            });
            console.log(devtoList[0]['name']);
        }
    })
    .catch((err) => {
        console.log(err)
    });
  }
}

async function compile() {
  images = await parseImage()
    .catch(error => {
      console.log(error);
    });
    console.log(image);
}

compile();