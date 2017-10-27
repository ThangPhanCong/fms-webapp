

const React = require('react');
import {Grid, Row, Col, Checkbox} from 'react-bootstrap';

let FmsSettingItem = React.createClass({
  check: function () {

  },
  render: function() {
    let self = this;

    return (
      <div>
        <Checkbox checked={self.props.checked}
          inputRef={ref => { this.input = ref; }}
          onChange={self.check}>{self.props.name}</Checkbox>
      </div>
    );
  }
});

module.exports = FmsSettingItem;
