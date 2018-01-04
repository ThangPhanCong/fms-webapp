import React, {Component} from "react";

class FmsTransportingSearchBar extends Component {
    render () {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="product_name">Mã đơn</label>
                        <input type="text" id="product_name" name="product_name" value=""
                               placeholder="" className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Khách hàng</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Điện thoại</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Ngày y/c vận chuyển</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Đơn vị vận chuyển</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsTransportingSearchBar;