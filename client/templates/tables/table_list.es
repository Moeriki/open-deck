// template helpers

Template.tableList.helpers({

  gamePageData: function () {
    return {
      _tableId: this.tableId,
      _gameId: this._id,
    };
  },

});

// template events

Template.tableList.events({

  'click .js-create-new-table': function createNewTableAndGame(e) {
    e.preventDefault();

    Meteor.call('createTable', function (err, result) {
      if (err) {
        return log.error('error while creating table', err);
      }

      let { tableId, gameId } = result;

      Router.go('gamePage', { _tableId: tableId, _gameId: gameId });
    });
  },

});
