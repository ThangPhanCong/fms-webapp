const React = require('react');
const calendar = require('calendar.png');
const mail = require('mail.png');
const mobile = require('mobile.png');
const speech = require('speech.png');
const star = require('star.png');
const todo = require('todo.png');

let FmsVerticalNav = React.createClass({
  render: function () {
    return (
      <div>
        <div><img src={speech} className="vertical-nav-item"/></div>
        <div><img src={mail} className="vertical-nav-item"/></div>
        <div><img src={star} className="vertical-nav-item"/></div>
        <div><img src={mobile} className="vertical-nav-item"/></div>
        <div><img src={calendar} className="vertical-nav-item"/></div>
        <div><img src={todo} className="vertical-nav-item"/></div>
      </div>
    );
  }
});

module.exports = FmsVerticalNav;
