Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  name: 'tableList',
  waitOn: function () {
    return [
      Meteor.subscribe('tableList'),
      Meteor.subscribe('gameList'),
    ];
  },
  data: function () {
    return Tables.find();
  }
});

let GameController = RouteController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('singleTable', this.params._tableId),
      Meteor.subscribe('singleGame', this.params._gameId),
      Meteor.subscribe('gamePlayers', this.params._gameId)
    ];
  },
  data: function () {
    return Games.findOne(this.params._gameId);
  },
});

Router.route('/tables/:_tableId/games/:_gameId', {
  controller: GameController,
  name: 'gamePage',
});

Router.route('/tables/:_tableId/games/:_gameId/players/join', {
  controller: GameController,
  name: 'playerJoin',
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
    return Players.findOne(this.params._playerId);
  }
});

Router.onBeforeAction('dataNotFound');

Router.onBeforeAction(function () {
  let userId = Meteor.userId();
  let player = Players.findOne(this.params._playerId);

  if (!userId || player.userId !== userId) {
    return this.render('accessDenied');
  }

  return this.next();
}, { only: ['playerPage'] });
