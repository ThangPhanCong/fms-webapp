'use strict';

const React = require('react');

const FmsNavigation = require('FmsNavigation');

let FmsApp = (props) => {
  return (
    <div>
      <FmsNavigation/>
      {props.children}
    </div>
  );
};

module.exports = FmsApp;
