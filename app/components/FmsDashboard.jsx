var React = require('react');
var FmsConversationArea = require('FmsConversationArea');
var FmsClientList = require('FmsClientList');
var PagesAPI = require('PagesAPI');
var {browserHistory} = require('react-router');

var FmsDashBoard = React.createClass({
    componentWillMount: function () {
        // need to change to getPages(1) when using real API
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
                    <FmsClientList/>
                </div>
                <div id="conversation-area">
                    <FmsConversationArea/>
                </div>
            </div>
        );
    }
});

module.exports = FmsDashBoard;