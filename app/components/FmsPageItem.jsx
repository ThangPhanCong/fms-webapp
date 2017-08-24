var React = require('react');

var FmsPageItem = React.createClass({
    render: function () {
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        return (
            <div className="well">
                <img src={avaUrl} className="page-profile"/> 
                <span className="fanpage-title">{this.props.data.name}</span>
            </div>
        );
    }
});

module.exports = FmsPageItem;