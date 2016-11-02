import createModel, { ObjectId } from './__mongoose';

import Card from './__Card';

export default createModel('Stack', {

  cards: {
    type: [Card],
    default: [],
    required: true,
  },

  game: {
    ref: 'Game',
    required: true,
    type: ObjectId,
  },

  player: {
    ref: 'Player',
    required: false,
    type: ObjectId,
  },

  private: {
    required: false,
    type: Boolean,
  },

});
