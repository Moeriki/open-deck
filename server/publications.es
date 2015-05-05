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

Meteor.publishComposite('gamePlayers', function (gameId) {
  return {
    find: function () {
      return Players.find({ gameId }, { fields: { cards: 0 } });
    },
    children: [{
      find: function (player) {
        return Meteor.users.find(player.userId, { fields: { username: 1, status: 1 } });
      }
    }]
  };
});
