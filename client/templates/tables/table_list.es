let log = loglevel.createPackageLogger('tableList');

// private functions

function isUserInGame(gameId) {
  let userId = Meteor.userId();
  return !!userId && !!Players.findOne({ userId, gameId });
}

// template helpers

Template.tableList.helpers({

  gamePageData: function () {
    return { _tableId: this.tableId, _gameId: this._id };
  },

  hasTables: function () {
    return this.count() > 0;
  },

  joinOpenLabel: function () {
    return isUserInGame(this._id) ? 'open' : 'join';
  }

});

// template events

Template.tableList.events({

  'click .js-create-new-table': function createNewTableAndGame(e) {
    e.preventDefault();

    let tableId = Tables.insert({ name: 'My Table' });
    let gameId = Games.insert({ tableId });

    Router.go('gamePage', { _tableId: tableId, _gameId: gameId });
  },

  'click .js-join-game': function joinTable(e) {
    e.preventDefault();

    let gameId = this._id;
    let tableId = this.tableId;

    if (isUserInGame(gameId)) {
      let userId = Meteor.userId();
      let playerId = Players.findOne({ userId, gameId })._id;

      Router.go('playerPage', {
        _tableId: tableId,
        _gameId: gameId,
        _playerId: playerId,
      });

      return;
    }

    Meteor.call('createPlayer', gameId, function (err, playerId) {
      if (err) {
        log.error('could not create player', err);
        return;
      }

      log.info('player created', playerId);

      Router.go('playerPage', {
        _tableId: tableId,
        _gameId: gameId,
        _playerId: playerId,
      });
    });
  },

});
