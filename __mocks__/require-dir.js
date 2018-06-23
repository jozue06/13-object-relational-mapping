'use strict';
import drums from '../src/models/drums.js';
import cymbals from '../src/models/cymbals.js';
export default (dir) => {

  const fakeMongo = {
    find: () => Promise.resolve(['foo']),
    findById: () => Promise.resolve({}),
    save: data => Promise.resolve(data),
    findOneAndDelete: () => Promise.resolve({}),
    findByIdAndUpdate: () => Promise.resolve([]),
  };

  if (typeof dir !== 'string') {
    return {};
  }
  return {
    'foo': {
      default: fakeMongo,
    },
    'bar': {
      default: fakeMongo,
    },
    'baz': {
      default: fakeMongo,
    },
    'drums': {
      default: drums,
    },
    'cymbals': {
      default: cymbals,
    },
  };
};