Template.gamePage.events({

  'click .js-shuffle-deck': function (e) {
    e.preventDefault();

    Games.update(this.game._id, {
      $set: { deck: CardsService.simplePokeShuffle(this.game.deck) }
    });
  },

});
