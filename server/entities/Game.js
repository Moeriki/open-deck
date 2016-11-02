import createModel, { ObjectId } from './__mongoose';

export default createModel('Game', {

  name: {
    $type: String,
    required: true,
  },

  stacks: {
    $type: [ObjectId],
    default: [],
    required: true,
    ref: 'Stack',
  },

  table: {
    $type: ObjectId,
    ref: 'Table',
    required: true,
  },

});
