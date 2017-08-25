var $ = require('jquery');

module.exports = {
    setPages: function (pages) {
        if ($.isArray(pages)) {
            localStorage.setItem('pages', JSON.stringify(pages));
            return pages;
        }
    },
    getPages: function () {
        var stringpages = localStorage.getItem('pages');
        var pages = [];
        try {
            pages = JSON.parse(stringpages);
        } catch (e) {

        }
        if ($.isArray(pages)) {
            return pages;
        } else {
            return [];
        }
    },
};