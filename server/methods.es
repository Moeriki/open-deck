Meteor.methods({

  createPlayer: function (gameId) {
    return Players.insert({
      gameId,
      userId: Meteor.userId(),
      cards: []
    });
  },

});
