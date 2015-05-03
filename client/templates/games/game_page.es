function stackOperation(which, fn) {
  return function (e) {
    e.preventDefault();

    let cards = this[which];
    if (cards.length === 0) {
      return;
    }

    let data = fn(cards);
    log.info('deck operation result: ', data);

    let $setter = {};
    $setter[which] = cards;

    Games.update(this._id, { $set: $setter });
  };
}

Template.gamePage.events({

  'click .js-deck-cut': stackOperation('deck', (cards) => CardsService.cut(cards)),

  'click .js-deck-overhand-shuffle': stackOperation('deck', (cards) => CardsService.overhandShuffle(cards)),

  'click .js-deck-riffle-shuffle': stackOperation('deck', (cards) => CardsService.riffleShuffle(cards)),

  // 'click .js-deck-simple-poke-shuffle': stackOperation('deck', (cards) => CardsService.simplePokeShuffle(cards)),

  // 'click .js-deck-poke-shuffle': stackOperation('deck', (cards) => CardsService.pokeShuffle(cards)),

  'click .js-deck-open-card': function (e) {
    e.preventDefault();

    if (this.deck.length === 0) {
      return;
    }

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
