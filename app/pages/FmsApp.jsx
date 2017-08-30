var React = require('react');
var FmsNavigation = require('FmsNavigation');

var FmsApp = (props) => {
    return (
        <div>
            <FmsNavigation/>
            {props.children}
        </div>
    );
};

module.exports = FmsApp;
