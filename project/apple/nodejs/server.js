const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.listen(port, function (){
    console.log(`listening on ${port}`);
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/react', express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/react', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});

// app.get('*', function (요청, 응답) {
//     응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
// });