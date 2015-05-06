/**
 * A player is the state of one user in one game.
 * @type {Mongo.Collection}
 * @param {string} userId
 * @param {string} gameId
 * @param {Array<string>} hand
 */

Players = new Mongo.Collection('players');

Players.helpers({

  user: function () {
    return Meteor.users.findOne(this.userId);
  },

  table: function () {
    return this.game().table();
  },

  game: function () {
    return Games.findOne(this.gameId);
  },

  hand: function () {
    return Stacks.findOne({
      playerId: this._id,
      table: false,
    });
  },

});
