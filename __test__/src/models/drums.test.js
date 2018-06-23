'use strict';

import Drums from '../../../src/models/drums.js';
import modelsHelper from '../../../scripts/models.helper.js';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
afterEach(modelsHelper.afterEach);


describe('drums tests', () => {


  it('check for model', () => {

    expect(Drums).toBeDefined();

  });


  it('should find zero', () => {

    return Drums.find()
      .then(drumsRes =>{
        expect(drumsRes.length).toBe(0);

      }).catch(err =>{
        fail(err);
      });

  });

  it('should create drum', ()=>{

    let drum = new Drums({
      drumName : 'Snare',
      diameter : 14,

    });

    return drum.save()
      .then(snare =>{
        expect(snare.drumName).toEqual('Snare');
      }).catch(err => fail(err));

  });


  // create()

});