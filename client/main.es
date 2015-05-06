window._ = window.lodash;

errorHandler = function (err) {
  if (err) {
    return log.error(err);
  }
};
