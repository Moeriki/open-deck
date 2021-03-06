Meteor.methods({

  // user

  createTable: function () {
    // TODO only allow users to create tables
    // check(this.userId, String);
    let tableId = Tables.insert({ name: 'My Table' });
    let gameId = Games.insert({ tableId });

    return { tableId, gameId };
  },

  joinGame: function (gameId) {
    check(this.userId, String);
    check(gameId, String);

    let game = Games.findOne(gameId);
    if (!game) {
      throw new Meteor.Error('game-not-found');
    }

    let playerId = Players.insert({ userId: this.userId, gameId });

    Stacks.insert({
      gameId,
      title: Meteor.user().username,
      playerId,
      size: 0,
      table: false,
      open: true,
      face: true,
      arrangeable: true,
      poppable: true,
      pushable: true,
      cards: [],
    });
  },

  takeSeat: function (playerId) {
    check(this.userId, String);
    check(playerId, String);

    let player = Players.findOne(playerId);
    if (!player) {
      throw new Meteor.Error('player-not-found');
    }

    let gameId = player.game()._id;

    Players.update(playerId, { $set: { userId: this.userId } });

    Stacks.update({ gameId, playerId }, { $set: { title: this.user.username() }});
  },

  // stack

  arrangeStack: function (stackId, method = 'sort') {
    check(stackId, String);
    // TODO check(method, ['sort', 'cut', 'overhand', 'riffle']);

    let stack = Stacks.findOne(stackId);
    if (!stack) {
      throw Meteor.Error('stack not found');
    }

    if (!stack.arrangeable) {
      return log.warn('stack is not allowed to be arranged');
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

    // TODO check if userId either hosts or participates in the game

    if (srcStackId === dstStackId) {
      return log.warn('source and destination stack is the same');
    }

    srcStack = Stacks.findOne(srcStackId);
    dstStack = Stacks.findOne(dstStackId);

    if (!srcStack || !dstStack) {
      throw new Meteor.Error('data-not-found', 'either source or destination stack not found');
    }

    if (!srcStack.poppable || !dstStack.pushable) {
      throw new Meteor.Error('permission-denied', 'stack r/w operation denied');
    }

    if (srcStack.gameId !== dstStack.gameId) {
      throw new Meteor.Error('data-mismatch', 'stacks are not in the same game');
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
