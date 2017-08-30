var React = require('react');
var FmsConversationArea = require('FmsConversationArea');
var FmsClientList = require('FmsClientList');
var PagesAPI = require('PagesAPI');
var {browserHistory} = require('react-router');
var DashboardAPI = require('DashboardAPI');

var FmsDashBoard = React.createClass({
    getInitialState: function () {
        return {
            currentConversation: undefined,
            conversations: []
        }
    },
    handleClientClick: function (fb_id) {
        for (let conversation of this.state.conversations) {
            if (conversation.fb_id == fb_id) {
                this.setState({ currentConversation: conversation });
                break;
            }
        }
    },
    componentWillMount: function () {
        this.setState({ 
            conversations: DashboardAPI.getConversations()
        });
        var that = this;
        PagesAPI.getPages().then(function (pages) {
            if (!pages.active) browserHistory.replace('/');
            else {
                var linkIsOK = false;
                pages.active.map(function (page) {
                    var nameInListPages = page.fb_id;
                    var nameInUrl = that.props.location.pathname.slice(1);
                    if (nameInUrl == nameInListPages) linkIsOK = true;
                });
                if (!linkIsOK) browserHistory.replace('/'); 
            }
        }, function (err) {
            console.log(err);
        });
    },
    render: function () {
        return (
            <div>
                <div id="client-list">
                    <FmsClientList handleClientClick={this.handleClientClick} conversations={this.state.conversations}/>
                </div>
                <div id="conversation-area">
                    <FmsConversationArea currentConversation={this.state.currentConversation}/>
                </div>
            </div>
        );
    }
});

module.exports = FmsDashBoard;