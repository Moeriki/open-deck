import createModel, { ObjectId } from './__mongoose';

export default createModel('Player', {

  name: {
    $type: String,
    required: true,
  },

  room: {
    $type: ObjectId,
    ref: 'Room',
  },

  stack: {
    $type: ObjectId,
    ref: 'Stack',
  },

  table: {
    $type: ObjectId,
    ref: 'Table',
  },

});
