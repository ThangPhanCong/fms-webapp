import React from 'react';
import FmsDatePicker from './FmsDatePicker';

export default class FmsDatePickerTest extends React.Component {
    state = {
        startDate: null,
        endDate: null
    }

    handleEvent(event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
        });
        console.log(picker);
    }
    
    render() {
        return (
            <div className='col-md-3 form-group pull-right'>
                <FmsDatePicker onEvent={this.handleEvent.bind(this)}/>
            </div>
        );
    }
}
