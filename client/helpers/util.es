Template.registerHelper('size', function (obj) {
  if (typeof obj.count === 'function') {
    // Assume Meteor Cursor
    return obj.count();
  }

  return _.size(obj);
});
