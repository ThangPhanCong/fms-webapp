'use strict';

const express = require('express');

let app = express();

app.use(express.static('public'));

app.listen(3000, function (err) {
  if (err) return console.log(err);

  console.log('Server is up on port ' + 3000);
});
