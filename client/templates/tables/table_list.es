let log = loglevel.createPackageLogger('tableList');

Template.tableList.helpers({

  gamePageData: function () {
    return { _tableId: this.tableId, _gameId: this._id };
  },

  hasTables: function () {
    return Tables.find().count() > 0;
  },

});

Template.tableList.events({

  'click .js-create-new-table': function createNewTableAndGame(e) {
    e.preventDefault();

    let tableId = Tables.insert({ name: 'My Table' });
    let gameId = Games.insert({ tableId });

    Router.go('gamePage', { _tableId: tableId, _gameId: gameId });
  },

  'click .js-join-game': function joinTable(e) {
    e.preventDefault();

    let tableId = this.tableId;
    let gameId = this._id;

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
