/**
 * A stack is a serie of cards linked to a game, and optionally a specific player.
 * @param {string} gameId
 * @param {string} playerId
 * @param {string} title
 * @param {number} size
 * @param {bool} table
 * @param {bool} open
 * @param {bool} face
 * @param {bool} arrangeable
 * @param {bool} poppable
 * @param {bool} pushable
 * @param {Array.<Object>} cards
 */

Stacks = new Mongo.Collection('stacks');

Stacks.helpers({

  game: function () {
    return Games.findOne(this.gameId);
  },

  player: function () {
    return Players.findOne(this.playerId);
  },

});
