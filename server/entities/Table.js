
import createModel, { ObjectId } from './__mongoose';

export default createModel('Table', {

  game: {
    $type: ObjectId,
    ref: 'Game',
    required: false,
  },

  name: {
    $type: String,
    required: true,
  },

  players: {
    $type: [ObjectId],
    default: [],
    ref: 'Player',
    required: true,
  },

  room: {
    $type: ObjectId,
    ref: 'Room',
    required: true,
  },

});
