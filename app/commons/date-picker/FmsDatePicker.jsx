import React from 'react';
import propTypes from 'prop-types';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment-mini';

class FmsDatePicker extends React.Component {
    state = {
        ranges: {},
        startDate: null,
        endDate: null,
        locale: {}
    }

    handleEvent(event, picker) {
        const {startDate, endDate} = this.state;
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
        });

        if (startDate !== picker.startDate || endDate !== picker.endDate) {
            this.props.onEvent(event, picker);
        }
    }
    
    componentWillMount() {
        this.setState({
            ranges: {
                'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
                'Hôm qua': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                '7 ngày trước': [moment().subtract(6, 'days'), moment()],
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            locale: {
                applyLabel: 'Áp dụng',
                cancelLabel: 'Đóng',
                customRangeLabel: 'Tùy chọn'
            }
        })
    }
    
    render() {
        const {startDate, endDate, ranges, timePickerIncrement, locale} = this.state;
        const start = startDate.format('DD/MM/YYYY');
		const end = endDate.format('DD/MM/YYYY');
		let label = start + ' - ' + end;
		if (start === end) {
			label = start;
        }

        return (
            <DateRangePicker 
                startDate={startDate} 
                endDate={endDate} 
                ranges={this.state.ranges} 
                onApply={this.handleEvent.bind(this)}
                timePicker24Hour={true}
                applyClass='btn-primary'
                locale={locale}
                timePicker={true}
                opens='left'
            >
                <button className="selected-date-range-btn form-control" style={{width:'100%'}}>
                    <div className="pull-left"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                    <div className="pull-right">
                        <span>
                            {label}
                        </span>
                        <span className="caret"></span>
                    </div>
                </button>
            </DateRangePicker>
        )
    }
}

FmsDatePicker.propTypes = {
    onEvent: propTypes.func
}

export default FmsDatePicker;
