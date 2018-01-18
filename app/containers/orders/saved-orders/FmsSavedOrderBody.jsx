import React, {Component} from "react";
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsSuccessOrdersTab from "./FmsSuccessOrdersTab";
import FmsFailureOrderTab from "./FmsFailureOrderTab";

class FmsSavedOrderBody extends Component {

    render() {
        // return (
        //     <p>Lưu trữ đơn</p>
        // )
        const {project} = this.props;
        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-lg-12">
                        <FmsTabs>
                            <FmsTab
                                title={{
                                    content: 'Đơn giao thành công',
                                    icon: 'fa fa-check green-text'
                                }}
                            >
                                <FmsSuccessOrdersTab project={project}/>
                            </FmsTab>

                            <FmsTab
                                title={{
                                    content: 'Đơn bị hủy',
                                    icon: 'fa fa-times red-text'
                                }}
                            >
                                <FmsFailureOrderTab project={project}/>
                            </FmsTab>

                        </FmsTabs>
                    </div>

                </div>
            </div>
        )
    }
}


export default FmsSavedOrderBody;