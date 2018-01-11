import React from 'react';
import FmsCheckbox from './FmsCheckbox.jsx';

export default class FmsCheckboxTest extends React.Component {
	state = {
		checked: false
	}
	onChange() {
		this.setState({checked: !this.state.checked})
	}
    render() {
        return (
            <div style={{marginLeft: '20px'}}>
                <FmsCheckbox
                    checked={this.state.checked}
					onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}
