Template.playerPage.events({

  'click .js-play-card': function (e) {
    e.preventDefault();

    let player = Template.parentData();

    Players.update(player._id, { $pull: { cards: this } });
    Games.update(player.game()._id, { $push: { open: this } });
  },

});
