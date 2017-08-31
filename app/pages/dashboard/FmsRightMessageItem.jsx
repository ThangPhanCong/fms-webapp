var React = require('react');

var FmsRightMessageItem = React.createClass({
    render: function () {
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.message.sender.fb_id}/picture`;
        return (
            <div id="right-message">
                <div id="div-in-right-message">
                    <span id="right-message-content">{this.props.message.message}</span>
                    <img src={avaUrl} id="right-profile"/>
                </div>
            </div>
        );
    }
});

module.exports = FmsRightMessageItem;