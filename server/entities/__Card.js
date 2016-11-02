import { Mixed, Schema } from './__mongoose';

export default new Schema({

  data: Mixed,

  number: { // eslint-disable-line id-blacklist
    $type: Number,
    max: 13,
    min: 1,
    set: Math.round,
  },

  suit: {
    $type: String,
    enum: [
      'spades',
      'hearts',
      'diamonds',
      'clubs',
    ],
    lowercase: true,
  },

});
