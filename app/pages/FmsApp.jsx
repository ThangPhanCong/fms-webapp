const React = require('react');
let FmsNavigation = require('FmsNavigation');

let FmsApp = (props) => {
    return (
        <div>
            <FmsNavigation/>
            {props.children}
        </div>
    );
};

module.exports = FmsApp;
