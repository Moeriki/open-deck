window._ = window.lodash;

window.logout = function () {
  Meteor.logout(function onLogout(err) {
    if (err) {
      log.error('logout failed', err);
    } else {
      log.info('logout succesful');
    }
  });
};
