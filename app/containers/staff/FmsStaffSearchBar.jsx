import React, {Component} from "react";

class FmsStaffSearchBar extends Component {
    render () {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="product_name">Mã nhân viên</label>
                        <input type="text" id="product_name" name="product_name" value=""
                               placeholder="" className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Họ tên</label>
                        <input type="text" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Vai trò</label>
                        <input type="text" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Email</label>
                        <input type="text" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Số điện thoại</label>
                        <input type="text" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsStaffSearchBar;