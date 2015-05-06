/**
 * A table holds a physical location where one or multiple games can be played.
 * @param {string} name
 */

Tables = new Mongo.Collection('tables');

Tables.helpers({

  games: function () {
    return Games.find({ tableId: this._id });
  },

});
