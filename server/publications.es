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

// composites

Meteor.publishComposite('publicGame', function (gameId) {
  return {
    find: function () {
      return Games.find(gameId);
    },
    children: [{
      find: function (game) {
        return Players.find({ gameId: game._id });
      },
      children: [{
        find: function (player) {
          return Meteor.users.find(player.userId, { fields: { username: 1, status: 1 } });
        }
      }]
    }, {
      find: function (game) {
        return Stacks.find({ gameId: game._id, table: true, open: true });
      },
    }, {
      find: function (game) {
        return Stacks.find({ gameId: game._id, table: true, open: false }, { fields: { cards: 0 } });
      }
    }, {
      find: function (game) {
        return Stacks.find({ gameId: game._id, table: false }, { fields: { cards: 0 } });
      }
    }]
  };
});

Meteor.publishComposite('privatePlayer', function (playerId) {
  return {
    find: function () {
      return Players.find(playerId);
    },
    children: [{
      find: function (player) {
        return Stacks.find({
          playerId: player._id,
          table: false,
        });
      }
    }]
  };
});
