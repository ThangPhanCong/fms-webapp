var React = require('react');

var FmsRightMessageItem = React.createClass({
    render: function () {
        return (
            <div>
                <p>{this.props.message.message}</p>
            </div>
        );
    }
});

module.exports = FmsRightMessageItem;