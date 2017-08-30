var React = require('react');
var FmsLeftMessageItem = require('FmsLeftMessageItem');
var FmsRightMessageItem = require('FmsRightMessageItem');
var jwtDecode = require('jwt-decode');
var Cookie = require('universal-cookie');
var uuid = require('uuid');

let cookie = new Cookie();
let jwt = cookie.get('jwt');
let user_id = jwtDecode(jwt).fb_id;

var FmsConversationArea = React.createClass({
    render: function () {
        var self = this;
        let renderConversation = function () {
            if (!self.props.currentConversation) return;
            return self.props.currentConversation.messages.map(function (message) {
                if (message.sender.fb_id == user_id) {
                    return <FmsRightMessageItem message={message} key={uuid()}/>;
                } else {
                    return <FmsLeftMessageItem message={message} key={uuid()}/>;
                }
            });
        };
        return (
            <div>
                <div id="chat-area">
                    {renderConversation()}
                </div>
                <div id="input-message-area"> 

                </div>
            </div>
        );
    }
});

module.exports = FmsConversationArea;