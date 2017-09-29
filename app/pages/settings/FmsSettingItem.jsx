'use strict';

const React = require('react');
import {Grid, Row, Col, Checkbox} from 'react-bootstrap';

let FmsSettingItem = React.createClass({
  render: function() {
    let self = this;

    return (
      <div>
        <Checkbox>ok men</Checkbox>
      </div>
    );
  }
});

module.exports = FmsSettingItem;
