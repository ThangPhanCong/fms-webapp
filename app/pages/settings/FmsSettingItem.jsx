

import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

class FmsSettingItem extends React.Component {
  render() {
    let self = this;

    return (
      <div>
        <Checkbox checked={self.props.checked}
          inputRef={ref => { this.input = ref; }}
          onChange={self.check}>{self.props.name}</Checkbox>
      </div>
    );
  }
}

module.exports = FmsSettingItem;
