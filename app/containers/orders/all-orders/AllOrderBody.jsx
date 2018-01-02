import React, {Component} from "react";
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsNewOrderTab from "./FmsNewOrderTab";

class AllOrderBody extends Component {
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <FmsTabs>
                            <FmsTab title='Đơn hàng mới'>
                                <FmsNewOrderTab/>
                            </FmsTab>

                            <FmsTab title='Yêu cầu xuất'>
                                <p>ok men</p>
                            </FmsTab>

                            <FmsTab
                                title={
                                    <button className='btn btn-primary btn-sm btn-create-order'
                                            onClick={() => console.log('ok men')}>
                                        <i className='fa fa-pencil'/> Tạo đơn
                                    </button>
                                }
                                renderBody={false}
                            />
                        </FmsTabs>
                    </div>
                </div>
            </div>
        )
    }
}


export default AllOrderBody;