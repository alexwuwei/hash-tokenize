'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

let publicRouter = express.Router();
let apiRouter = express.Router();

require('./routes/login')(publicRouter);

app.use(bodyParser.json());
app.use('/public', publicRouter);


app.listen(3000, () => {
  console.log('listening on 3000');
});
