'use strict';



import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name : String,
});

export default mongoose.model('Band', schema);



// import mongoose from 'mongoose';



/*
const newSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    uppercase: true,
    required: true,
  },
  bats: {
    type: String,
    required: true,
    default: 'R',
    enum: ['R', 'r', 'L', 'l'],
  },
  throws: {
    type: String,
    required: true,
    default: 'R',
    enum: ['R', 'r', 'L', 'l'],
  },
});

export default mongoose.model('model', newSchema);

*/