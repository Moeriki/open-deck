var SYMBOL_MAP = {
  11: 'J', 12: 'Q', 13: 'K'
};

Template.cardItem.helpers({

  symbol: function () {
    return SYMBOL_MAP[this.number] || this.number;
  },

});
