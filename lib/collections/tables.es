/**
 * A table holds a physical location where one or multiple games can be played.
 * @type {Mongo.Collection}
 * @param {string} name
 * @param {Object} location
 * @param {Object.number} longitude
 * @param {Object.number} latitude
 */

Tables = new Mongo.Collection('tables');

Tables.helpers({

  games: function () {
    return Games.find({ tableId: this._id });
  }

});
