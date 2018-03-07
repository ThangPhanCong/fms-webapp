import React, {Component} from "react";
import FmsDatePicker from '../../../commons/date-picker/FmsDatePicker';

class FmsExportOrderSearchBar extends Component {
    state = {
        filter: {},
        startDate: null,
        endDate: null,
        startDate2: null,
        endDate2: null
    };

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        let newFilter = {
            ...this.state.filter,
            [refName]: newValue
        };
            
        this.setState({filter: newFilter});

        this.props.onChangeFilter(newFilter);
    }

    handleEvent(event, picker) {
        let startDate = picker.startDate;
        let endDate = picker.endDate;
        const newFilter = {
            ...this.state.filter,
            'created_time[from]': startDate.valueOf(),
            'created_time[to]': endDate.valueOf()
        }
        this.setState({
			startDate: startDate,
            endDate: endDate,
            filter: newFilter
        });

        this.props.onChangeFilter(newFilter);        
    }

    handleEvent2(event, picker) {
        let startDate = picker.startDate;
        let endDate = picker.endDate;
        const newFilter = {
            ...this.state.filter,
            'updated_time[from]': startDate.valueOf(),
            'updated_time[to]': endDate.valueOf()
        }
        this.setState({
			startDate2: startDate,
            endDate2: endDate,
            filter: newFilter
        });

        this.props.onChangeFilter(newFilter);        
    }

    render() {
        const {
            id,
            customer_name,
            customer_phone,
            product
        } = this.state.filter;

        return (
            <div className='row'>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Mã đơn</label>
                        <input type="text" className="form-control"
                            ref='id'
                            value={id || ''}
                            onChange={() => this.onChangeInput('id')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Khách hàng</label>
                        <input type="text" className="form-control"
                            ref='customer_name'
                            value={customer_name || ''}
                            onChange={() => this.onChangeInput('customer_name')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Điện thoại</label>
                        <input type="text" className="form-control"
                            ref='customer_phone'
                            value={customer_phone || ''}
                            onChange={() => this.onChangeInput('customer_phone')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Sản phẩm</label>
                        <input type="text" className="form-control"
                            ref='product'
                            value={product || ''}
                            onChange={() => this.onChangeInput('product')}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Ngày tạo</label>
                        <FmsDatePicker onEvent={this.handleEvent.bind(this)}/>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label">Ngày xuất</label>
                        <FmsDatePicker onEvent={this.handleEvent2.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderSearchBar;