import React, {Component, Fragment} from "react";
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsNewOrderTab from "./FmsNewOrderTab";
import FmsExportOrderTab from "./FmsExportOrderTab";
import * as storage from 'helpers/storage';
import FmsCreateOrderModal from "../../../commons/order-modal/FmsCreateOrderModal";
import FmsBlankPage from "../../../commons/blank-page/FmsBlankPage";
import {delay} from 'utils/timeout-utils';
import {getOrderView, postOrderView} from "../../../api/UserViewApi";

class AllOrderBody extends Component {

    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_ORDER_VIEW');

        this.state = {
            isShownCreateOrderModal: false,
            version: 0,
            isFirstTime
        };

        if (isFirstTime) {
            this.updateOrderView(project_id);
        }
    }

    updateOrderView(project_id) {
        getOrderView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_ORDER_VIEW', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    skipFirstView() {
        delay(1000).then(() => this.setState({isFirstTime: false}));

        const project_id = this.props.project._id;

        storage.set(project_id + '_' + 'ALL_ORDER_VIEW', true);
        postOrderView(project_id);
    }

    openCreateOrderModal() {
        this.setState({isShownCreateOrderModal: true});
    }

    onCloseModal(shouldUpdateOrderList) {
        const {isFirstTime} = this.state;
        if (shouldUpdateOrderList) {
            this.setState({version: this.state.version + 1});

            if (isFirstTime) {
                this.skipFirstView();
            }
        }

        this.setState({isShownCreateOrderModal: false})
    }

    onOpenModal() {
        this.openCreateOrderModal();
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;
        if (nextProps.project && project !== nextProps.project) {
            this.updateOrderView(nextProps.project._id);
        }
    }

    render() {
        const {project} = this.props;
        const {
            isShownCreateOrderModal,
            version,
            isFirstTime
        } = this.state;

        return (
            <Fragment>
                {
                    isFirstTime
                        ? (
                            <FmsBlankPage title='Tất cả đơn hàng'>
                                <p>
                                    Tất cả đơn hàng là nơi quản lí đơn hàng đang trong quá trình xử lí. Bạn có thể tạo mới,
                                    sửa đổi trạng thái đơn hàng bằng những thẻ màu.
                                </p>
                                <div style={{marginTop: 20}}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.openCreateOrderModal.bind(this)}
                                    >
                                        <i className='fa fa-pencil'
                                           style={{marginRight: 5}}
                                        />
                                        Tạo đơn hàng
                                    </button>
                                    <button
                                        className='btn btn-outline btn-white'
                                        onClick={() => this.skipFirstView()}
                                    >
                                        Bỏ qua
                                    </button>
                                </div>
                            </FmsBlankPage>
                        )
                        : (
                            <div className="wrapper wrapper-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <FmsTabs tabActive={0}>

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
                                </div>
                            </div>
                        )
                }

                <FmsCreateOrderModal
                    isShown={isShownCreateOrderModal}
                    onClose={this.onCloseModal.bind(this)}
                    project={project}
                />
            </Fragment>
        )
    }
}


export default AllOrderBody;