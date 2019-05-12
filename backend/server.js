const bodyParser = require('body-parser');
const express  = require('express');
var multer = require('multer');
const path = require('path');
var cors = require('cors');

// handle saving of a POSTed photo
const {storage, upload} = require('./photos.js');

// return list of items from photo
const compile = require('./text_classify.js');

// return recipes from list of items
const getRecipe = require('./edamam.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// POST photos here
// TODO: don't know how to get error handling to work
app.post('/receipt', upload.single("recfile"), (req, res, next) => {
  filePath = path.join('./photos', req.file.filename);
  compile(filePath)
  .then((result) => {
    getRecipe(result)
      .then((hi) => {
        res.send(hi);
      })
      .catch((error) => {
        console.log(error);
        res.send("ERR2");
      });
  })
  .catch((error) => {
    console.log(error);
    res.send("ERR");
  });
})

app.get('/', (req, res) => {
  res.send("You've been sour-patchd :o")
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
