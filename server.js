'use strict';

const express = require('express');
const path = require('path');

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('/build/index.html');
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, function (err) {
  if (err) return console.log(err);

  console.log('Fms-webapp server is up on port ' + 3000);
});
