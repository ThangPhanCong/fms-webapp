import React, {Component} from "react";
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsNewOrderTab from "./FmsNewOrderTab";
import FmsCreateOrderModal from "../modals/FmsCreateOrderModal";
import FmsExportOrderTab from "./FmsExportOrderTab";

class AllOrderBody extends Component {

    state = {
        isShownCreateOrderModal: false,
        version: 0
    };

    onCloseModal(shouldUpdateOrderList) {
        if (shouldUpdateOrderList) {
            this.setState({version: this.state.version + 1});
        }

        this.setState({isShownCreateOrderModal: false})
    }

    onOpenModal() {
        this.setState({isShownCreateOrderModal: true})
    }

    render() {
        const {project} = this.props;
        const {
            isShownCreateOrderModal,
            version
        } = this.state;

        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-lg-12">
                        <FmsTabs>

                            <FmsTab title='Đơn hàng mới'>
                                <FmsNewOrderTab project={project} version={version}/>
                            </FmsTab>

                            <FmsTab title='Yêu cầu xuất'>
                                <FmsExportOrderTab project={project} version={version}/>
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
                        project={project}
                    />


                </div>
            </div>
        )
    }
}


export default AllOrderBody;