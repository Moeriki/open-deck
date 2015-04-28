Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

Router.route('/', {
  name: 'tableList',
  waitOn: function () {
    return [Meteor.subscribe('tableList'), Meteor.subscribe('gameList')];
  },
  data: function () {
    return { tables: Tables.find() };
  }
});

Router.route('/tables/:_tableId/games/:_gameId', {
  name: 'gamePage',
  waitOn: function () {
    return [
      Meteor.subscribe('singleTable', this.params._tableId),
      Meteor.subscribe('singleGame', this.params._gameId),
      Meteor.subscribe('gamePlayers', this.params._gameId)
    ];
  },
  data: function () {
    let game = Games.findOne(this.params._gameId);

    return { game };
  }
});

Router.route('/tables/:_tableId/games/:_gameId/players/:_playerId', {
  name: 'playerPage',
  waitOn: function () {
    return [
      Meteor.subscribe('singleTable', this.params._tableId),
      Meteor.subscribe('singleGame', this.params._gameId),
      Meteor.subscribe('singlePlayer', this.params._playerId)
    ];
  },
  data: function () {
    let game = Games.findOne(this.params._gameId);
    let player = Players.findOne(this.params._playerId);

    return { game, player };
  }
});
