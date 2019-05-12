var JSSoup = require('jssoup').default;
const rp = require('request-promise');  
const axios = require('axios');
const cheerio = require('cheerio');

function reformat_rdci(original_rdci) {
    return original_rdci.substring(0, 3) + '-' 
    + original_rdci.substring(3,5) + '-'
    + original_rdci.substring(5); 
}

query = {
    'web_name': 'https://brickseek.com/target-inventory-checker',
    'item': '?sku=055-02-1344'
};

var web_content = '';

axios(query['web_name'] + query['item'])
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

