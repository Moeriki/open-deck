// lists

Meteor.publish('tableList', function () {
  return Tables.find();
});

Meteor.publish('gameList', function () {
  return Games.find();
});

// singles

Meteor.publish('singleTable', function (tableId) {
  return Tables.find(tableId);
});

Meteor.publish('singleGame', function (gameId) {
  return Games.find(gameId);
});

Meteor.publish('singlePlayer', function (playerId) {
  return Players.find(playerId);
});

// composites

Meteor.publish('gamePlayers', function (gameId) {
  let players = Players.find({ gameId });
  let playerIds = _.pluck(players.fetch(), 'userId');
  let users = Meteor.users.find({ _id: { $in: playerIds } });

  return [players, users];
});
