import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../../../scripts/models.helper.js';
import DrumSet from '../../../src/models/drumSet.js';
import Drum from '../../../src/models/drums.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/drums';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
afterEach(modelsHelper.afterEach);


describe('api module', () => {


  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for Drums off the bat', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  it('should post a Drum', () => {

    const DrumObj = {
      drumName: 'Snare',
      diameter: 8,
    };

    return mockRequest
      .post(API_URL)
      .send(DrumObj)
      .then(results => {

        try {
          const Drum = JSON.parse(results.text);
          expect(Drum.drumName).toBe(DrumObj.drumName);
          expect(Drum._id).toBeDefined();
        } catch (error) {
          fail(err);
        }
      }).catch(err => fail(err));
  });

  it('should add to all Drums after a post', () => {

    const DrumObj = {
      drumName: 'Rack Tom',
      diameter: 10,
    };

    return mockRequest
      .post(API_URL)
      .send(DrumObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(Drums => expect(Drums.length).toBe(1))
          .catch(err => fail(err));
      });

  });

  xit('to do - delete, error codes, etc.', () => {});

});

describe('DrumSet', () => {

  it('should populate DrumSet', async () => {

    const DrumSetObj = {
      name: 'Iron Maiden drum set',
    };

    const myDrumSet = await DrumSet.create(DrumSetObj);

    expect(myDrumSet.name).toBe(DrumSetObj.name);

    const DrumObj = {
      drumName: 'Floor Tom',
      diameter: 25,
      DrumSet: myDrumSet._id,
    };

    const newDrum = await Drum.create(DrumObj);

    const foundNewDrum = await Drum
      .findById(newDrum._id)
      .populate('DrumSet')
      .exec();

    expect(foundNewDrum.DrumSet.name).toBe(DrumSetObj.drumName);

  });
});

describe('Drum model', () => {

  xit('Model should exist', () => {
    expect(Drum).toBeDefined();
  });

  xit('should give zilch when asking for all Drums first time', () => {

    return Drum.find().then(Drums => {
      expect(Drums).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  xit('should create a Drum', () => {

    // remember to create a rpoiut
    let drum = new Drum({
      drumName: 'Pink snare',
      diameter: 14,
    });

    return drum.save().then(snareCur => {
      expect(snareCur.drumName).toEqual('Pink snare');
    }).catch(err => fail(err));
  });

  xit('should get collection of created Drums', () => {


    const DrumObj = {
      drumName: 'Kick',
      diameter: 22,
    };

    return Drum.create(DrumObj).then(drum => {

      expect(drum.drumName).toBe(DrumObj.drumName);
      expect(drum.diameter).toBe(DrumObj.diameter);
      expect(drum._id).toBeDefined();

      return Drum.find().then(Drums => {
        expect(Drums.length).toEqual(1);
        expect(Drums[0].drumName).toBe(DrumObj.drumName);
      }).catch(err => {
        fail(err);
      });

    });



  });

  xit('should find one by id', () => {

    const DrumObj = {
      drumName: 'Barry Manilow Snare',
      diameter: 9,
    };

    return Drum.create(DrumObj).then(barrySnare => {

      return Drum.findById(barrySnare._id).then(drum => {

        expect(drum.drumName).toEqual(DrumObj.drumName);

      }).catch(fail);

    }).catch(fail);
  });

  xit('should delete a Drum - async/await version', async () => {

    const newDrum = {
      drumName: 'Aretha Franklin Kick',
      diameter: 25,
    };

    const drum = await Drum.create(newDrum);

    expect(drum.drumName).toBe('Aretha Franklin Kick');

    await Drum.findByIdAndRemove(drum._id);

    const Drums = await Drum.find();

    expect(Drums.length).toBe(0);

  });

//   xit('should delete a Drum - Promise version', () => {

//     return Drum
//       .create({
//         drumName: 'Aretha Franklin kick2 ',
//         diameter: 26,
//       })
//       .then(Drum => {

//         return Drum.deleteOne({
//           _id: Drum._id,
//         }).then(result => {

//           expect(result.ok).toBe(1);

//           return Drum.find().then(Drums => {

//             expect(Drums.length).toBe(0);
//           });

//         });
//       });
//   });

  xit('should reject on find when id not found', () => {

    return Drum.findById('wrong').then(() => {
      fail('should not get here');
    }).catch(err => {
      expect(err).toBeDefined();
    });
  });

  /* NOTE: several ways to handle this
  1. make fields required in model
  2. Have check in api for {} body
  3. Use pre save hook middleware
  */
  xit('should reject on POST when no body provided', () => {
    return Drum
      .create({})
      .then(Drum => {
        fail('should not get here:' + Drum);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  xit('should reject on put then id not found', () => {
    return Drum.findByIdAndUpdate('wrong', {
      rank: 100,
    })
      .then(() => fail('should not get here'))
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  /* NOTE: several ways to handle this. Expiriment!
  1. make fields required in model
  2. Have check in api for {} body
  3. Use pre save hook middleware
  */
  xit('should reject on PUT when no body provided', () => {
    return Drum
      .create({
        name: 'Tina Turner',
        rank: 12,
      })
      .then(Drum => {

        return Drum
          .findByIdAndUpdate(Drum._id, {})
          .then(() => {
            fail('wtf');
          }).catch(err => {
            expect(err).toBe({});
          });
      })
      .catch(err => {
        expect(err).toBe({});
      });
  });

});