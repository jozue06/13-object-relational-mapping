import Drums from '../../../src/models/drums.js';
import DrumSet from '../../../src/models/DrumSet.js';
import modelsHelper from '../models.helper';

describe('drum model', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

  it('Model should exist', () => {
    expect(Drums).toBeDefined();
  });

  it('should give zilch when asking for all drums first time', () => {

    return Drums.find().then(drums => {
      expect(drums).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });


it('should post a drum', () => {

    const drumObj = {
      drumName: 'Snare',
      color: 'green',
      diameter : '14',

    };

    return mockRequest
      .post(API_URL)
      .send(drumObj)
      .then(results => {

        try {
          const drum = JSON.parse(results.text);
          expect(drum.drumName).toBe(drumObj.drumName);
          expect(drum._id).toBeDefined();
        } catch (error) {
          fail(err);
        }
      }).catch(err => fail(err));
  });


  it('should get collection of created drums', () => {

    const drumObj = {
      drumName: 'Snare',
      color: 'green',
      diameter : '14',

    };


    return Drums.create(drumObj).then(drum => {

      expect(drum.drumName).toBe(drumObj.drumName);
      expect(drum.color).toBe(drumObj.color);
      expect(drum._id).toBeDefined();

      return Drums.find().then(drums => {
        expect(drums.length).toEqual(1);
        expect(drums[0].drumName).toBe(drumObj.drumName);
      }).catch(err => {
        fail(err);
      });

    });



  });

  it('should find one by id', () => {

    const drumObj = {
      drumName: 'Snare',
      color: 'green',
      diameter : '14',

    };
    return Drums.create(drumObj).then(drum => {

      return Drums.findById(drum._id).then(bar => {

        expect(bar.drumName).toEqual(drumObj.drumName);

      }).catch(fail);

    }).catch(fail);
  });

  xit('should delete a drum - async/await version', async () => {

    const drumObj = {
      drumName: 'Snare',
      color: 'green',
      diameter : '14 inches',

    };

    // const drumObj = await Drums.create(newDrum);

    expect(drumObj.drumName).toBe('drumObj Fcolorlin');

    await Drums.findByIdAndRemove(drumObj._id);

    const drums = await Drums.find();

    expect(drums.length).toBe(0);

  });

  it('should delete a drum - Promise version', () => {

    return Drums
      .create({
        drumName: 'drums',
        diameter: 20,
        color : 'red',
      })
      .then(drum => {

        return Drums.deleteOne({
          _id: drum._id,
        }).then(result => {

          expect(result.ok).toBe(1);

          return Drums.find().then(drums => {

            expect(drums.length).toBe(0);
          });

        });
      });
  });

  it('should reject on find when id not found', () => {

    return Drums.findById('wrong').then(drum => {
      fail('should not get here');
    }).catch(err => {
      expect(err).toBeDefined();
    })
  });

  /* NOTE: several ways to handle this
  1. make fields required in model
  2. Have check in api for {} body
  3. Use pre save hook middleware
  */
  it('should reject on POST when no body provided', () => {
    return Drums
      .create({})
      .then(drum => {
        fail('should not get here:' + drum);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should reject on put then id not found', () => {
    return Drums.findByIdAndUpdate('wrong', {
        color: 100
      })
      .then(drum => fail('should not get here'))
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
    return Drums
      .create({
        drumName: 'Tina Turner',
        diameter: 12
      })
      .then(drum => {

        return Drums
          .findByIdAndUpdate(drum._id, {})
          .then(drum => {
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