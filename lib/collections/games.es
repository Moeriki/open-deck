/**
 * A game is one card game in progress or finished on a table.
 * @type {Mongo.Collection}
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

});

// TODO try to move collection hook to server
Games.before.insert(function (id, game) {
  game.deck = CardsService.createDeck();
  game.open = [];
  game.fold = [];
});