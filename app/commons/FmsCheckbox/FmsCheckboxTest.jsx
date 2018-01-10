import React from 'react';
import FmsCheckbox from './FmsCheckbox.jsx';

export default class FmsCheckboxTest extends React.Component {
  state = {
    checked: this.props.checked || false
  }
  onChange() {
    this.setState({checked: !this.state.checked});
  }
  render() {
    const checked = this.state.checked;
    return (
      <div style={{marginLeft: '20px'}}>
        <FmsCheckbox label='Default' checked={checked} handleChange={this.onChange.bind(this)}/>
        <p>
          Add class: <code>.checkbox-primary</code>, <code>.checkbox-info</code>... like Bootstrap
        </p>
        <FmsCheckbox className='checkbox-primary' checked={checked} label='Primary' handleChange={this.onChange.bind(this)}/>
        <FmsCheckbox className='checkbox-info' checked={checked} label='Info' handleChange={this.onChange.bind(this)}/>
        <p>
          Add class: <code>.checkbox-circle</code>
        </p>
        <FmsCheckbox className='checkbox-circle' checked={checked} label='Checkbox circle' handleChange={this.onChange.bind(this)}/>
        <p>
          Add class: <code>.checkbox-inline</code>
        </p>
        <FmsCheckbox className='checkbox-inline' checked={checked} label='Checkbox inline1' handleChange={this.onChange.bind(this)}/>
        <FmsCheckbox className='checkbox-info checkbox-circle checkbox-inline' checked={checked} label='Checkbox inline2' handleChange={this.onChange.bind(this)}/>
        <p>
          Add attr: <code>disabled</code>
        </p>
        <FmsCheckbox checked={checked} disabled label='Disabled' handleChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}
