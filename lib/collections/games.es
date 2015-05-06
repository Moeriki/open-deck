/**
 * A game is one card game in progress or finished on a table.
 * @param {string} tableId
 */

Games = new Mongo.Collection('games');

Games.helpers({

  table: function () {
    return Tables.findOne(this.tableId);
  },

  players: function () {
    return Players.find({ gameId: this._id });
  },

  stacks: function () {
    return Stacks.find({ gameId: this._id });
  },

});
