import React, {Component} from "react";

class FmsExportOrderSearchBar extends Component {
    render () {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <label className="control-label" htmlFor="product_name">Mã sản phẩm</label>
                        <input type="text" id="product_name" name="product_name" value=""
                               placeholder="" className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Tên sản phẩm</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Giá bán ra</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label" htmlFor="price">Số lượng</label>
                        <input type="text" id="price" name="price" value="" placeholder=""
                               className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsExportOrderSearchBar;