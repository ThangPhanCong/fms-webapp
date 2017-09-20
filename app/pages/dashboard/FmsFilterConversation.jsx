module.exports.filters = [
  {
    type: 'all',
    isActive: true,
    filterFunc: function (item) {
      return true;
    }
  },
  {
    type: 'unread',
    isActive: false,
    filterFunc: function (item) {
      return item.is_seen == false;
    }
  },
  {
    type: 'comment',
    isActive: false,
    filterFunc: function (item) {
      return item.type == 'comment';
    }
  },
  {
    type: 'inbox',
    isActive: false,
    filterFunc: function (item) {
      return item.type == 'inbox';
    }
  }
]