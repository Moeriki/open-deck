// Meteor.users

Meteor.users.helpers({

  player: function () {
    return Players.findOne({ userId: this._id });
  },

});
