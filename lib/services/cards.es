// consts

const COLORS = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

const round = Math.round;

// private functions

function randomCutPosition(cards, random) {
  let size = cards.length;

  if (_.isNumber(random)) {
    return _.random(round(random * size));
  }

  if (_.isArray(random)) {
    return _.random(round(random[0] * size), round(random[1] * size));
  }

  return _.random(size);
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

  sort: function (cards) {
    cards.sort(function (c1, c2) {
      return COLORS.indexOf(c1.color) - COLORS.indexOf(c2.color) || c1.number - c2.number;
    });
  },

  cut: function (cards, options = {}) {
    _.defaults(options, {
      at: 'random',// any non number = 'random'
      random: [0.25, 0.75],
    }, options);

    let at = options.at;
    if (typeof at !== 'number') {
      at = randomCutPosition(cards, options.random);
    }

    cards.splice(0, 0, ...cards.splice(at));

    return at;
  },

  overhandShuffle: function (cards, options = {}) {
    _.defaults(options, {
      nested: -1,
      random: 0.25,
    });

    let minSize = round(cards.length * 0.1);
    let overhand = function (ohCards) {
      let cutPos = randomCutPosition(ohCards, options.random);
      let cut = ohCards.splice(cutPos);
      let result = [];

      result.push(cutPos);
      if (cut.length > minSize) {
        result.push(...overhand(cut));
      }

      ohCards.unshift(...cut);

      return result;
    };

    return overhand(cards);
  },

  riffleShuffle: function (cards, options = {}) {
    _.defaults(options, { sticky: 3 });

    let insertIndex = 0;
    let secondHalf = cards.splice(round(cards.length / 2));

    let rnd = _.partial(_.random, 1, options.sticky);

    do {
      let dropRnd = rnd();

      insertIndex += rnd();
      cards.splice(insertIndex, 0, ...secondHalf.splice(0, dropRnd));

      insertIndex += dropRnd;
    } while (secondHalf.length > 0);
  },

  // simplePokeShuffle: function (cards) {
  //   // TODO write mutable method
  //   cards= _.shuffle(cards);
  // },
  //
  // pokeShuffle: function (cards) {
  //   let deckSize, bottomCard, currentCard;
  //
  //   deckSize = cards.length;
  //   bottomCard = cards[deckSize - 1];
  //
  //   do {
  //     currentCard = cards.splice(0);
  //     cards.splice(_.random(deckSize - 1), 0, currentCard);
  //   } while (currentCard !== bottomCard);
  //
  //   return cards;
  // },

};
