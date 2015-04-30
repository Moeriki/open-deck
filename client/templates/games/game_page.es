Template.gamePage.events({

  'click .js-shuffle-deck': function (e) {
    e.preventDefault();

    if (this.deck.length === 0) {
      return;
    }

    Games.update(this._id, {
      $set: { deck: CardsService.simplePokeShuffle(this.deck) }
    });
  },

  'click .js-deal-card': function (e) {
    e.preventDefault();

    let game = this.game();
    if (game.deck.length === 0) {
      return;
    }

    let card = game.deck[game.deck.length - 1];

    Games.update(game._id, { $pop: { deck: 1 } });

    Players.update(this._id, { $push: { cards: card } });
  },

  'click .js-fold-cards': function (e) {
    e.preventDefault();

    if (this.open.length === 0) {
      return;
    }

    Games.update(this._id, { $push: { fold: { $each: this.open } } });

    Games.update(this._id, { $set: { open: [] } });
  },

});
