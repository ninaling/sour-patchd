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
  const fileName = '/Users/Saquib/Desktop/test1.jpg';
  let rdci_codes = [];
  //
  // var image = {
  //   source: {imageUri: fileName}
  // };

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
  images = await parseImage();
  console.log(images);
    // .catch(error => {
    //   console.log("here")
    //   console.log(error);
    // });
    // console.log("bruh")
    // console.log(images);
}

compile();
