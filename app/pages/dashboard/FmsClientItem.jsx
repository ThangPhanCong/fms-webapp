var React = require('react');

var FmsClientItem = React.createClass({
    render: function () {
        var that = this;
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        return (
            <div id="client-item">
                <img src={avaUrl} id="client-profile" />
                <div id="name-and-message">
                    <div id="client-name">{this.props.data.name}</div>
                    <div id="lastest-message">{this.props.data.message}</div>
                </div>
            </div>
        );
    }
});

module.exports = FmsClientItem;