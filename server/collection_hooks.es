Games.after.insert(function () {
  // deck
  Stacks.insert({
    gameId: this._id,
    title: 'deck',
    size: 52,
    table: true,
    open: false,
    face: false,
    arrangeable: true,
    poppable: true,
    pushable: false,
    cards: CardsService.createDeck(),
  });

  // open
  Stacks.insert({
    gameId: this._id,
    title: 'open',
    size: 0,
    table: true,
    open: true,
    face: true,
    arrangeable: true,
    poppable: true,
    pushable: true,
    cards: [],
  });

  // fold
  Stacks.insert({
    gameId: this._id,
    title: 'fold',
    size: 0,
    table: true,
    open: false,
    face: false,
    arrangeable: false,
    poppable: false,
    pushable: true,
    cards: [],
  });
});
