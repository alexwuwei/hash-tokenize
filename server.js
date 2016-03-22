'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let publicRouter = express.Router();
let apiRouter = express.Router();

require('./routes/login')(publicRouter);

app.use('/public', publicRouter);

app.listen(3000);
