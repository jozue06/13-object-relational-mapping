'use strict';

import mongoose, {Schema} from 'mongoose';

const schema = new Schema({

  drumName: {
    type: String,
    required: true,
  },
  diameter: {
    type: Number,
    required: true,
  },
  woodType: {
    type: String,
    // required: true,
    default: 'Maple',
  },
  color: {
    type: String,
    // required: true,
  },
  drumSet: {type: Schema.Types.ObjectId, ref: 'Drum Set' },
});

export default mongoose.model('Drums', schema);
