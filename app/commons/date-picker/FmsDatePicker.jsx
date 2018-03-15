import React from 'react';
import propTypes from 'prop-types';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment-mini';

class FmsDatePicker extends React.Component {
    state = {
        ranges: {},
        locale: {},
        label: ''
    }

    handleEvent(event, picker) {
        if (picker.startDate.format('DD/MM/YYYY') === picker.endDate.format('DD/MM/YYYY')) {
			this.setState({
                label: picker.startDate.format('DD/MM/YYYY')
            });
        } else {
            this.setState({
                label: picker.startDate.format('DD/MM') + '-' + picker.endDate.format('DD/MM')
            });
        }

        this.props.onEvent(event, picker);
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
            locale: {
                applyLabel: 'Áp dụng',
                cancelLabel: 'Đóng',
                customRangeLabel: 'Tùy chọn'
            }
        })
    }
    
    render() {
        const {ranges, locale, label} = this.state;
        const {startDate, endDate} = this.props;

        return (
            <DateRangePicker 
                startDate={startDate} 
                endDate={endDate} 
                ranges={this.state.ranges} 
                onApply={this.handleEvent.bind(this)}
                applyClass='btn-primary'
                locale={locale}
                opens='left'
            >
                <button className="selected-date-range-btn form-control">
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
    onEvent: propTypes.func,
    startDate: propTypes.object,
    endDate: propTypes.object
}

export default FmsDatePicker;
