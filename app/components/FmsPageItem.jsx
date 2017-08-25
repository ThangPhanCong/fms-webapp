var React = require('react');

var FmsPageItem = React.createClass({
    render: function () {
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        return (
            <div className="page-item">
                <img src={avaUrl} className="page-profile"/> 
                <span className="fanpage-title">{this.props.data.name}</span>
                <button className="pull-right" id="activebutton">KÍCH HOẠT</button>
            </div>
        );
    }
});

module.exports = FmsPageItem;