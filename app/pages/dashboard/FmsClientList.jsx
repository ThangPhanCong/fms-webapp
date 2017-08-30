var React = require('react');
var FmsClientItem = require('FmsClientItem');
var DashboardAPI = require('DashboardAPI');

var FmsClientList = React.createClass({
    handleClientClick: function (fb_id) {
        this.props.handleClientClick(fb_id);
    },
    render: function () {
        var self = this;
        var renderClients = function () {
            var conversations = self.props.conversations;
            return conversations.map(function (conversation) {
                return <FmsClientItem data={conversation} key={conversation.fb_id} handleClientClick={self.handleClientClick}/>
            });
        };
        return (
            <div>
                {renderClients()}
            </div>
        );
    }
});

module.exports = FmsClientList;