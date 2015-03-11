var path = require('path');
var express = require('express');
var errorHandler = require('../lib');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  throw new Error('an error you say?');
});

app.get('/401', function(req, res) {
  e = new Error('Access denied');
  e.status = 401;
  throw e;
});

var apiRouter = express.Router();
apiRouter.get('/', function() {
  throw new Error('an error you say?');
});

apiRouter.use(errorHandler.ApiErrorsMiddleware);

app.use('/api', apiRouter);

app.use(errorHandler.NotFoundMiddleware);
app.use(errorHandler.ErrorsMiddleware);

module.exports = app;
