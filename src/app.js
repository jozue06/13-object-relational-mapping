'use strict';


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './api/api.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(router);

app.use(notFound);
app.use(errorHandler);

let server = false;

module.exports = {
  start: (port) => {
    if(! server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log(`Server up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    server.close( () => {
      console.log('Server has been stopped');
    });
  },
};





/* 

'use strict';

import express from 'express';
import router from './api/api.js';

const app = express();

app.use(router);

module.exports = {

  start: port => app.listen(port, console.log('Listening on PORT', port)),
  stop: () => app.close(),
  server: app,
};

*/

