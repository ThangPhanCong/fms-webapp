import React, {Component} from "react";
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsNewOrderTab from "./FmsNewOrderTab";
import FmsCreateOrderModal from "../modals/FmsCreateOrderModal";
import FmsExportOrderTab from "./FmsExportOrderTab";

class AllOrderBody extends Component {

    state = {
        isShownCreateOrderModal: false
    };

    onCloseModal(shouldUpdateOrderList) {
        if (shouldUpdateOrderList) {

        }

        this.setState({isShownCreateOrderModal: false})
    }

    onOpenModal() {
        this.setState({isShownCreateOrderModal: true})
    }

    render() {
        const {isShownCreateOrderModal} = this.state;

        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-lg-12">
                        <FmsTabs>

                            <FmsTab title='Đơn hàng mới'>
                                <FmsNewOrderTab/>
                            </FmsTab>

                            <FmsTab title='Yêu cầu xuất'>
                                <FmsExportOrderTab />
                            </FmsTab>

                            <FmsTab
                                title={
                                    <button className='btn btn-primary btn-sm btn-create-order'
                                            onClick={this.onOpenModal.bind(this)}>
                                        <i className='fa fa-pencil'/> Tạo đơn
                                    </button>
                                }
                                renderBody={false}
                            />

                        </FmsTabs>
                    </div>

                    <FmsCreateOrderModal
                        isShown={isShownCreateOrderModal}
                        onClose={this.onCloseModal.bind(this)}
                    />

                </div>
            </div>
        )
    }
}


export default AllOrderBody;