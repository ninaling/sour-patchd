const bodyParser = require('body-parser');
const express  = require('express');
var multer = require('multer');

const {storage, upload} = require('./photos.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// POST photos here
// TODO: don't know how to get error handling to work
app.post('/receipt', upload.single("recfile"), (req, res, next) => {
})

app.get('/', (req, res) => {
  res.send("You've been sour-patchd :o")
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
