import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../../src/models.helper';

const mockRequest = supertest(server);

const API_URL = '/api/v1/drums/';

describe('api module', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for drums off the bat', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  it('should post a drum', () => {

    const drumObj = {
      drumName: 'Snare',
      color: 'green',
      diameter : '14 inches',

    };

    return mockRequest
      .post(API_URL)
      .send(drumObj)
      .then(results => {

        try {
          const drum = JSON.parse(results.text);
          expect(drum.name).toBe(drumObj.name);
          expect(drum._id).toBeDefined();
        } catch (error) {
          fail(err);
        }
      }).catch(err => fail(err));
  });

  it('should add to all drums after a post', () => {

    const drumObj = {
      name: 'Etta James',
      rank: 9,
    };

    return mockRequest
      .post(API_URL)
      .send(drumObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(drums => expect(drums.length).toBe(1))
          .catch(err => fail(err));
      });

  });

  xit('to do - delete, error codes, etc.', () => {});

});