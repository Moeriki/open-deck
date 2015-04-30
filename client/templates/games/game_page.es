Template.gamePage.events({

  'click .js-shuffle-deck': function (e) {
    e.preventDefault();

    Games.update(this._id, {
      $set: { deck: CardsService.simplePokeShuffle(this.deck) }
    });
  },

  'click .js-shift-card': function (e) {
    e.preventDefault();

    let game = this.game();
    let card = game.deck[game.deck.length - 1];

    Games.update(game._id, { $pop: { deck: 1 } });

    Players.update(this._id, { $push: { cards: card } });
  },

});
