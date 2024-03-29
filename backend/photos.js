var multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './photos')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
});

const upload = multer({ storage });

module.exports = {storage, upload}
