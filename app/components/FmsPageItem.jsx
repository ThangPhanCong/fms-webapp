var React = require('react');

var FmsPageItem = React.createClass({
    render: function () {
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        return (
            <div className="page-item five columns centered">
                <img src={avaUrl} /> {this.props.data.fb_id}. {this.props.data.name}
            </div>
        );
    }
});

module.exports = FmsPageItem;