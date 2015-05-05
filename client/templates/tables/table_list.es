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

    let tableId = Tables.insert({ name: 'My Table' });
    let gameId = Games.insert({ tableId });

    Router.go('gamePage', { _tableId: tableId, _gameId: gameId });
  },

});
