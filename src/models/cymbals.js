'use strict';

import mongoose, {Schema} from 'mongoose';

const schema = new Schema({

  cymbalType: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    uppercase: true,
    required: true,
  },
  finish: {
    type: String,
    required: true,
    default: 'Bright',
  },
  drumSet: {type: Schema.Types.ObjectId, ref: 'Drum Set' },
});

export default mongoose.model('cymbals', schema);