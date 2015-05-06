// private functions

function arrangeStack(method) {
  return function (e) {
    e.preventDefault();

    if (this.size === 0) {
      log.info('skip arrange because stack size is 0');
      return;
    }

    Meteor.call('arrangeStack', this._id, method, function (err, result) {
      if (err) {
        return log.error(err);
      }

      log.info('stack arrange result: ', result);
    });
  };
}

function dealOperation(dstStackId) {
  return function (e) {
    e.preventDefault();

    let stack = Template.currentData();
    if (stack.size === 0) {
      log.info('skip arrange because stack size is 0');
      return;
    }

    Meteor.call('dealCards', stack._id, dstStackId.call(this), function (err, result) {
      if (err) {
        return log.error(err);
      }

      log.info(`moved ${result} cards`);
    });
  };
}

// template helpers

Template.stackList.helpers({

  targetStacks: function () {
    return Stacks.find({
      _id: { $ne: this._id },
      gameId: this.game()._id,
      pushable: true,
      table: true,
    });
  },

  targetPlayers: function () {
    let player = this.player();

    return Players.find({
      _id: { $ne: player && player._id },
      userId: { $ne: null },
      gameId: this.game()._id,
    });
  },

  listCards: function () {
    return !this.table || this.open && this.face;
  },

});

// template events

Template.stackList.events({

  'click .js-stack-sort': arrangeStack('sort'),

  'click .js-stack-cut': arrangeStack('cut'),

  'click .js-stack-overhand-shuffle': arrangeStack('overhand'),

  'click .js-stack-riffle-shuffle': arrangeStack('overhand'),

  // 'click .js-stack-simple-poke-shuffle': arrangeStack('simplePoke'),

  // 'click .js-stack-poke-shuffle': arrangeStack('poke'),

  'click .js-move-to-stack': dealOperation(function () {
    return this._id;
  }),

  'click .js-player-deal-card': dealOperation(function () {
    return this.hand()._id;
  }),

});
