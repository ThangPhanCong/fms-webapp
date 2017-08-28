'use strict';

const express = require('express');

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('/build/index.html');
});

app.listen(3000, function (err) {
  if (err) return console.log(err);

  console.log('Fms-webapp server is up on port ' + 3000);
});
