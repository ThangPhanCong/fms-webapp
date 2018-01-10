import React from 'react';
import FmsCheckbox from './FmsCheckbox.jsx';

export default class FmsCheckboxTest extends React.Component {
  render() {
    return (
      <div style={{marginLeft: '20px'}}>
        <FmsCheckbox label='Default'/>
        <p>
          Add class: <code>.checkbox-primary</code>, <code>.checkbox-info</code>... like Bootstrap
        </p>
        <FmsCheckbox className='checkbox-primary' checked label='Primary'/>
        <FmsCheckbox className='checkbox-info' checked label='Info'/>
        <p>
          Add class: <code>.checkbox-circle</code>
        </p>
        <FmsCheckbox className='checkbox-circle' checked label='Checkbox circle'/>
        <p>
          Add class: <code>.checkbox-inline</code>
        </p>
        <FmsCheckbox className='checkbox-inline' checked label='Checkbox inline1'/>
        <FmsCheckbox className='checkbox-info checkbox-circle checkbox-inline' checked label='Checkbox inline2'/>
        <p>
          Add attr: <code>disabled</code>
        </p>
        <FmsCheckbox checked disabled label='Disabled'/>
      </div>
    );
  }
}
