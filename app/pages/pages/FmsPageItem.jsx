var React = require('react');

var FmsPageItem = React.createClass({
    onPageClick: function () {
        this.props.onPageClick(this.props.data);
    },
    render: function () {
        var that = this;
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        return (
            <div className="page-item" onClick={this.onPageClick}>
                <img src={avaUrl} className="page-profile" />
                <span className="fanpage-title">{this.props.data.name}</span>
            </div>
        );
    }
});

module.exports = FmsPageItem;