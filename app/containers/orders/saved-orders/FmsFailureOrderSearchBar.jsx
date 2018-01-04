import React, {Component} from "react";

class FmsFailureOrderSearchBar extends Component {
    render () {
        return (
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
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="quantity">Ngày tạo</label>
                        <input type="text" id="quantity" name="quantity" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-2">
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
        )
    }
}

export default FmsFailureOrderSearchBar;