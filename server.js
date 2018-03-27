const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

// app.get('/test', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'build', 'index-test.html'))
// });
//
// app.get('/test/*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, 'build', 'index-test.html'))
// });

app.get(/^\/shops.*/, handleToApp);
app.get(/^\/settings.*/, handleToApp);
app.get(/^\/login.*/, handleToApp);
app.get(/^\/forget-password.*/, handleToApp);
app.get(/^\/reset-password.*/, handleToApp);


app.listen(3000, function (err) {
    if (err) return console.log(err);

    console.log('Fms-webapp server is up on port ' + 3000);
});

function handleToApp(req, res) {
    return res.sendFile(path.resolve(__dirname, 'build', 'app.html'));
}