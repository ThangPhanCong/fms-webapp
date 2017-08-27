var React = require('react');

var FmsPageItem = React.createClass({
    getInitialState: function () {
        return {
            isSelected: false
        }
    },
    onPageClick: function () {
        if (this.props.inModal == 'true') {
            this.setState({
                isSelected: !this.state.isSelected
            });
        }
    },
    componentDidUpdate: function () {
        if (this.props.onPageClick) {
            this.props.onPageClick(this.state.isSelected, this.props.data.fb_id);
        }
    },
    render: function () {
        var that = this;
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        function renderActiveImg() {
            if (that.props.inModal == 'true' && that.state.isSelected) {
                return <img src="http://www.freeiconspng.com/download/14150" id="tick"/>
            }
        }
        return (
            <div className="page-item" onClick={this.onPageClick}>
                <img src={avaUrl} className="page-profile" />
                <span className="fanpage-title">{this.props.data.name}</span>
                {renderActiveImg()}
            </div>
        );
    }
});

module.exports = FmsPageItem;