var React = require('react');

var FmsPageItemInModal = React.createClass({
    getInitialState: function () {
        return { isSelected: false }
    },
    onPageClick: function () {
        this.setState({
            isSelected: !this.state.isSelected
        });
    },
    componentDidUpdate: function () {
        this.props.onPageClick(this.state.isSelected, this.props.data.fb_id);
    },
    render: function () {
        var that = this;
        let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
        function renderActiveImg() {
            if (that.state.isSelected) {
                return <img src="/img/tick.png" id="tick"/>
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

module.exports = FmsPageItemInModal;