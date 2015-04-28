// consts

var COLORS = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

// private functions

function repeatable(fn) {
  return function (times, ...args) {
    if (typeof times !== 'number' || times < 0) {
      args.shift(times);
      times = 1;
    }

    while (times-- > 0) {
      fn(...args);
    }
  };
}

// export module

CardsService = {

  createDeck: function () {
    var cards = [];

    COLORS.forEach(color => {
      for (let n = 1; n <= 13; n++) {
        cards.push({
          color: color,
          number: n
        });
      }
    });

    return cards;
  },

  coupDeck: function (cards) {
    CardsService.overhandShuffle(cards);
  },

  overhandShuffle: repeatable(function (cards, options = {}) {
    options = _.extend({
      nested: 1,
      offset: .25,
      topDown: true,
    }, options);

    if (!options.topDown) {
      cards.reverse();
    }

    let coupDeck = cards;

    do {
      let coupSize = coupDeck.length;
      let offset = Math.round(coupSize * options.offset);

      coupDeck = coupDeck.splice(_.random(-offset, offset));
      cards.push(...coupDeck);
    } while (--options.nested <= 0);

    if (!options.topDown) {
      cards.reverse();
    }
  }),

  riffleShuffle: repeatable(function (cards, options = {}) {
    options = _.extend({
      sticky: 5
    }, options);

    let insertIndex = 0;
    let secondHalf = cards.splice(Math.round(cards.length / 2));

    let rnd = _.partial(_.random, options.sticky);

    do {
      insertIndex += rnd();
      cards.splice(insertIndex, 0, ...secondHalf.splice(0, rnd()));
    } while (secondHalf.length > 0);
  }),

  simplePokeShuffle: function (cards) {
    // TODO write mutable method
    return _.shuffle(cards);
  },

  pokeShuffle: function (cards) {
    let deckSize, bottomCard, currentCard;

    deckSize = cards.length;
    bottomCard = cards[deckSize - 1];

    do {
      currentCard = cards.splice(0);
      cards.splice(_.random(deckSize - 1), 0, currentCard);
    } while (currentCard !== bottomCard);
  },

};
