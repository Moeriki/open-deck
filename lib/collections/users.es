Meteor.users.helpers({

  player: function () {
    return Players.findOne({ userId: this._id });
  },

  statusColor: function () {
    return this.status && this.status.online ? 'green' : 'red';
  },

});
