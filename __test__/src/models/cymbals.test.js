'use strict';

import Cymbals from '../../../src/models/cymbals.js';
import modelsHelper from '../../../scripts/models.helper.js';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
afterEach(modelsHelper.afterEach);


describe('cymbals tests', () => {


  it('check for cymbal model', () => {

    expect(Cymbals).toBeDefined();

  });


  it('should find zero cymbals in begining', () => {

    return Cymbals.find()
      .then(cymbalsRes =>{
        expect(cymbalsRes.length).toBe(0);

      }).catch(err =>{
        fail(err);
      });

  });

  it('should create cymbal', ()=>{

    let cymbal = new Cymbals({
      cymbalType : 'Crash',
      diameter : 14,

    });

    return cymbal.save()
      .then(crash =>{
        expect(crash.cymbalType).toEqual('Crash');
      }).catch(err => fail(err));

  });


  // create()

});