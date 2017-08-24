var React = require('react');
var FmsPageList = require('FmsPageList');

var FmsApp = React.createClass({
    render: function () {
        return (
            <div>
                <FmsPageList/>
            </div>
        );
    }
});

module.exports = FmsApp;