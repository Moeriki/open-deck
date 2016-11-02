/**
 * A room is based on a fysical location.
 */

import createModel, { ObjectId } from './__mongoose';

export default createModel('Room', {

  location: {
    // See: http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/
    $type: [Number],  // [<longitude>, <latitude>]
    index: '2d',     // create the geospatial index
    required: true,
  },

  name: {
    $type: String,
    required: true,
  },

  open: {
    $type: Boolean,
    default: true,
    required: true,
  },

  tables: {
    $type: [ObjectId],
    default: [],
    ref: 'Table',
    required: true,
  },

});
