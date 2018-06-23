// @flow
'use strict';

require('dotenv').config();

require('babel-register');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// Require our main app file and start the web server up
require('./src/app.js').start(process.env.PORT);
