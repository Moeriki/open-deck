Template.gamePage.events({

  'click .js-deck-shuffle': function (e) {
    e.preventDefault();

    if (this.deck.length === 0) {
      return;
    }

    Games.update(this._id, {
      $set: { deck: CardsService.simplePokeShuffle(this.deck) }
    });
  },

  'click .js-deck-open-card': function (e) {
    e.preventDefault();

    let card = this.deck[this.deck.length - 1];

    Games.update(this._id, { $pull: { deck: card } });
    Games.update(this._id, { $push: { open: card } });
  },

  'click .js-player-deal-card': function (e) {
    e.preventDefault();

    let game = this.game();
    if (game.deck.length === 0) {
      return;
    }

    let card = game.deck[game.deck.length - 1];

    Games.update(game._id, { $pull: { deck: card } });

    Players.update(this._id, { $push: { cards: card } });
  },

  'click .js-open-fold-cards': function (e) {
    e.preventDefault();

    if (this.open.length === 0) {
      return;
    }

    Games.update(this._id, { $push: { fold: { $each: this.open } } });

    Games.update(this._id, { $set: { open: [] } });
  },

});
