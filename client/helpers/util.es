function getSize(obj) {
  if (typeof obj.count === 'function') {
    // Assume Meteor Cursor
    return obj.count();
  }

  return _.size(obj);
}

Template.registerHelper('size', function (obj) {
  return getSize(obj);
});

Template.isEmpty.helpers({
  isEmpty: function () {
    return getSize(this) === 0;
  }
});
