'use strict';

import express from 'express';
const router = express.Router();
import modelFinder from '../middleware/modelSwitch';
router.param('model', modelFinder);

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write('hello');
  res.end();
});

router.get('/api/v1/:model', (req,res,next) => {
  req.model.find()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findById(req.params.id)
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.post('/api/v1/:model', (req,res,next) => {
  console.log('!!!!!!!!POST!!!!!!!!!!!');
  let record = new req.model(req.body);
  console.log('!!!!!!!!what a REQ.BODY!!!!!!!!!!!  ', req.body);
  record.save()
    .then( data => {
      console.log('!!!!!! INSIDE THE THEN!!!!!!!!');
      sendJSON(res,data) ;
    })
    .catch( err => {
      console.log('!!!!!! ERRROR???!!!!!!     ', err);
      next();});
});

router.put('/api/v1/:model/:id', (req,res,next) => {
  if(!req.model.id){return err;}
  let record = new req.model(req.body);
  record.findOneAndUpdate()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.delete('/api/v1/:model/:id', (req,res,next) => {
  console.log('hit delete route');
  if(!req.model.id){return err;}
  let record = new req.model(req.body);
  record.findOneAndDelete(req.body.id)
    .then( data => sendJSON(res,data) )
    .catch( next );
});


export default router;
