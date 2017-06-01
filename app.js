const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
 
const app = express();

var morgan = require('morgan');

app.use(morgan('combined'));

app.use(cors());
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    cb(null, `${Math.random().toString(36).substring(7)}${file.originalname.replace(/[^a-z0-9-.]/gi, '_').toLowerCase()}`);
  }
});

var upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

app.post('/upload', upload.any(), function(req, res){
  var originalName = req.files[0].originalname;
  var newName = req.files[0].filename;

  res.json({
    originalName: originalName,
    filename: newName
  });
});

app.listen(8081, () => {
  console.log('ng2-uploader server running on port 8081.');
});