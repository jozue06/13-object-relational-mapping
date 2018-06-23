'use strict';

require('babel-register');
const superagent = require('superagent');
const app = require( '../../../src/app.js');
import drums from '../../../src/models/drums.js';
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose');

const mockgoose = new Mockgoose(mongoose);


// const modelsHelper = require('../../../scripts/models.helper.js');

// afterAll(modelsHelper.afterAll);
// beforeAll(modelsHelper.beforeAll);
// afterEach(modelsHelper.afterEach);



describe('API', () => {


  it('gets a 500 response on an invalid model', () => {
    return mockgoose.get('http://localhost:8888/api/v1/foobar')
      .then(console.log)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });

  it('gets a 404 response on an invalid access point', () => {
    return mockgoose.get('http://localhost:8888/ap')
      .then(console.log)
      .catch(response => {
        console.log('wrong address 404: ', response.status);
        expect(response.status).toEqual(404);
      });
  });


  it('gets a 200 response on a good model, with correct response body', () => {
    return mockgoose.get('http://localhost:8888/api/v1/foo')
      .then(response => {
        console.log('response with object', response.body);
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets ID a 200 response on a good model with ID', () => {
    return mockgoose.get('http://localhost:8888/api/v1/foo/123')
      .then(response => {
        console.log('response with ID', response.statusCode);
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });


  it('POST a 200 response on a good model', () => {
    let obj = {
      name:'name',
    };
    return mockgoose.post('http://localhost:8888/api/v1/foo')
      .send(obj)
      .then(console.log('test API send sent'))
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('DELETES ID a 200 response on a good model with ID', (done) => {
    return mockgoose.post('http://localhost:8888/api/v1/foo/123')
      .then(response =>{
        console.log(response.body);
   

        return mockgoose.delete('http://localhost:8888/api/v1/foo/123')
          .then(response => {
            console.log('DELETED response with ID', response.statusCode);
          })
      
          .catch(response => {
            expect(response.statusCode).toEqual(200);
            done();
          });
      });
  });

});