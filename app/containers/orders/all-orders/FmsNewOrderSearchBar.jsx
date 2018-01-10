import React, {Component} from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

const viLocale = {
    format: 'DD/MM/YYYY h:mm A',
    applyLabel: 'Áp dụng',
    cancelLabel: 'Hủy bỏ',
    customRangeLabel: 'Tùy chọn',
    daysOfWeek: moment.localeData('vi').weekdaysMin(),
    monthNames: moment.localeData('vi').months(),
    firstDay: moment.localeData('vi').firstDayOfWeek(),
};

class FmsNewOrderSearchBar extends Component {
    state = {
        ranges: {
            'Hôm nay': [moment(), moment()],
            'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 ngày trước': [moment().subtract(6, 'days'), moment()],
            '30 ngày trước': [moment().subtract(29, 'days'), moment()],
            'Tháng này': [moment().startOf('month'), moment().endOf('month')],
            'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    }

    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    render () {
        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3 col-sm-offset-9">
                        <div className="form-group">
                            <label className="control-label" htmlFor="created-time">Ngày tạo</label>
                            <DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                ranges={this.state.ranges}
                                timePicker
                                timePickerIncrement={10}
                                applyClass={'btn-primary'}
                                opens={'left'}
                                locale={viLocale}
                                onEvent={this.handleEvent.bind(this)}
                            >
                                <button className="btn btn-default selected-date-range-btn" style={{width:'100%'}}>
                                    <div className="pull-left">
                                        <i className="fa fa-calendar glyphicon glyphicon-calendar"></i>
                                    </div>
                                    <div className="pull-right">
                                        <span>
                                            {label}
                                        </span>
                                        <span className="caret"></span>
                                    </div>
                                </button>
                            </DateRangePicker>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="product_name">Mã đơn</label>
                            <input type="text" id="product_name" name="product_name" value="" placeholder=""
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="price">Khách hàng</label>
                            <input type="text" id="price" name="price" value="" placeholder=""
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="quantity">Điện thoại</label>
                            <input type="text" id="quantity" name="quantity" value="" placeholder=""
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="quantity">Sản phẩm</label>
                            <input type="text" id="quantity" name="quantity" value="" placeholder=""
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="control-label" htmlFor="status">Đánh dấu</label>
                            <select name="status" id="status" className="form-control">
                                <option value="0" defaultValue></option>
                                <option value="1">Liên hệ lại</option>
                                <option value="2">Chờ quyết định</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsNewOrderSearchBar;