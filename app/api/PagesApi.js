let APISender = require('./ApiSender');

module.exports = {
  getPages: function () {
    let route = `/api/a/pages`;
    return APISender.get(route);
  },
  activePage: function (pageid) {
    let route = `/api/pages/${pageid}/active`;
    return APISender.post(route);
  }
};
