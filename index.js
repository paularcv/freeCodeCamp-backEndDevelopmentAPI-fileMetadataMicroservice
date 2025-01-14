var express = require('express');
var cors = require('cors');
var multer = require("multer");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer for file handling
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// endpoint for file upload
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({error: 'No file uploaded'});
  }

  // respond with file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
