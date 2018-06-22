'use strict';

require('babel-register');
const superagent = require('superagent');
const app = require( '../../../src/app.js');
import drums from '../../../src/models/drums.js';
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose');
import supertest from 'supertest';



const mockgoose = new Mockgoose(mongoose);

describe('API', () => {

  // const PORT = 8888;
  // beforeAll( () => {
  //   app.start(PORT);
  // });
  // afterAll( () => {
  //   app.stop();
  // });


  // const PORT = 8888;
  beforeAll( (done) => {
    mockgoose.preparStorage().then(()=>{
      mongoose.connect('mongodb://localhost/drums', ()=>{
        done()
      })
    })
    })
    app.start(PORT);
  });
  afterAll( () => {
    app.stop();
  });
  
  
  it('gets a 500 response on an invalid model', () => {
    return superagent.get('http://localhost:8888/api/v1/foobar')
      .then(console.log)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });

  it('gets a 404 response on an invalid access point', () => {
    return superagent.get('http://localhost:8888/ap')
      .then(console.log)
      .catch(response => {
        console.log('wrong address 404: ', response.status);
        expect(response.status).toEqual(404);
      });
  });


  it('gets a 200 response on a good model, with correct response body', () => {
    return superagent.get('http://localhost:8888/api/v1/foo')
      .then(response => {
        console.log('response with object', response.body);
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets ID a 200 response on a good model with ID', () => {
    return superagent.get('http://localhost:8888/api/v1/foo/123')
      .then(response => {
        console.log('response with ID', response.statusCode);
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });


  it('POST a 200 response on a good model', () => {
    let obj = {};
    return superagent.post('http://localhost:8888/api/v1/foo')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('DELETES ID a 200 response on a good model with ID', () => {
    return superagent.delete('http://localhost:8888/api/v1/foo/123')
      .then(response => {
        console.log('DELETED response with ID', response.statusCode);
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });


});


/*************************************************************************************************/



/* 

import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../models/models.helper.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/singers';

describe('api module', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for singers off the bat', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  it('should post a singer', () => {

    const singerObj = {
      name: 'Roy Orbison',
      rank: 8,
    };

    return mockRequest
      .post(API_URL)
      .send(singerObj)
      .then(results => {

        try {
          const singer = JSON.parse(results.text);
          expect(singer.name).toBe(singerObj.name);
          expect(singer._id).toBeDefined();
        } catch (error) {
          fail(err);
        }
      }).catch(err => fail(err));
  });

  it('should add to all singers after a post', () => {

    const singerObj = {
      name: 'Etta James',
      rank: 9,
    };

    return mockRequest
      .post(API_URL)
      .send(singerObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(singers => expect(singers.length).toBe(1))
          .catch(err => fail(err));
      });

  });

  xit('to do - delete, error codes, etc.', () => {});

});

*/



