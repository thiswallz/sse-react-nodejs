const express = require('express');
const sseExpress = require('sse-express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/updates', sseExpress, function(req, res) {
  res.sse('connected', {
    welcomeMsg: 'Hello world!',
  });
  setInterval(function() {
    res.sse('update', {
      value: `New value ${Math.floor(Math.random() * 10000 + 1)}`,
      date: new Date(),
    });
  }, 2000);
});

app.get('/products', function(req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

const server = app.listen(4000, function() {
  console.log('CORS-enabled web server listening on port 80');
});
