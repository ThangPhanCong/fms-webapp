var React = require('react');

var FmsLeftMessageItem = React.createClass({
    render: function () {
        return (
            <div>
                <p>{this.props.message.message}</p>
            </div>
        );
    }
});

module.exports = FmsLeftMessageItem;