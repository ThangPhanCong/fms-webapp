const express = require('express');
const path = require('path');

let app = express();

app.use(express.static('build'));

app.get('/test', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index-test.html'))
});

app.get('/test/*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index-test.html'))
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});


app.listen(3000, function (err) {
    if (err) return console.log(err);

    console.log('Fms-webapp server is up on port ' + 3000);
});
