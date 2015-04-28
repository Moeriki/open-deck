/**
 * A player is the state of one user in one game.
 * @type {Mongo.Collection}
 * @param {string} userId
 * @param {string} gameId
 * @param {Array<string>} hand
 */

Players = new Mongo.Collection('players');

Players.helpers({

  game: function () {
    return Games.findOne(this.gameId);
  },

  user: function () {
    return Meteor.users.findOne(this.userId);
  }

});
