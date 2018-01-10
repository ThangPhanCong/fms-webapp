const express = require('express');
const path = require('path');
const webpack = require('webpack');

const config = require('./config/webpack/webpack.common.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
let app = express();

app.use(express.static('build'));

// app.get('/', (req, res) => {
//   res.sendFile('/build/index.html');
// });


app.get('/test', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index-test.html'))
})

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(3000, function (err) {
  if (err) return console.log(err);

  console.log('Fms-webapp server is up on port ' + 3000);
});
