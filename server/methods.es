Meteor.methods({

  arrangeStack: function (stackId, method = 'sort') {
    // 'click .js-deck-cut': stackOperation((cards) => CardsService.cut(cards)),
    //
    // 'click .js-deck-overhand-shuffle': stackOperation((cards) => CardsService.overhandShuffle(cards)),
    //
    // 'click .js-deck-riffle-shuffle': stackOperation((cards) => CardsService.riffleShuffle(cards)),

    check(stackId, String);
    // check(method, ['sort', 'cut', 'overhand', 'riffle']);

    let stack = Stacks.findOne(stackId);
    if (!stack) {
      throw Meteor.Error('stack not found');
    }

    let cards = stack.cards;
    let result;

    switch (method) {
      default:
      case 'sort':
        CardsService.sort(cards);
        break;
      case 'cut':
        result = CardsService.cut(cards);
        break;
      case 'overhand':
        result = CardsService.overhandShuffle(cards);
        break;
      case 'riffle':
        result = CardsService.riffleShuffle(cards);
        break;
    }

    Stacks.update(stackId, { $set: { cards } });

    return result;
  },

  dealCards: function (srcStackId, dstStackId, count = 1) {
    let srcStack, dstStack, cards;

    check(srcStackId, String);
    check(dstStackId, String);
    check(count, Number);

    if (srcStackId === dstStackId) {
      return log.warn('source and destination stack is the same');
    }

    srcStack = Stacks.findOne(srcStackId);
    dstStack = Stacks.findOne(dstStackId);

    if (!srcStack || !dstStack) {
      return log.error('stack not found');
    }

    if (!srcStack.poppable || !dstStack.pushable) {
      return log.error('r/w operation not allowed');
    }

    if (srcStack.gameId !== dstStack.gameId) {
      return log.error('cant deal between games');
    }

    if (srcStack.cards.length < count) {
      return log.warn(`not enough cards, ${srcStack.cards.length} < ${count}`);
    }

    cards = srcStack.cards.slice(Math.max(0, srcStack.cards.length - count));

    Stacks.update(srcStackId, {
      $pullAll: { cards },
      $set: { size: srcStack.cards.length - cards.length },
    });

    Stacks.update(dstStackId, {
      $push: { cards: { $each: cards } },
      $set: { size: dstStack.cards.length + cards.length },
    });

    return cards.length;
  },

});
