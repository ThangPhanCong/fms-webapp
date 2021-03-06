import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsExportOrderSearchBar from "../orders/all-orders/FmsExportOrderSearchBar";
import FmsExportOrderTable from "./export-order/FmsExportOrderTable";
import {getOrders, ORDER_STATUS} from "../../api/OrderApi";
import {getAllProviders} from '../../api/TransportProviderApi';
import FmsOrderDetailModal from "../../commons/order-modal/FmsOrderDetailModal";
import FmsCreateTransportOrderModal from '../../commons/transport-order-modal/FmsCreateTransportOrderModal';
import FmsTransportOrderDetailModal from '../../commons/transport-order-modal/FmsTransportOrderDetailModal';
import * as storage from "../../helpers/storage";
import FmsBlankPage from "../../commons/blank-page/FmsBlankPage";
import * as uiApi from "../../api/UserViewApi";

class FmsExportOrders extends Component {

    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_ORDER_VIEW');

        this.state = {
            orders: [],
            selectedOrder: null,
            selectedOrderId: null,
            isLoading: true,
            isShownDetailModal: false,
            isShownCreateTransportOrderModal: false,
            isShownTransportOrderDetailModal: false,
            providers: [],
            filter: {},
            timeoutKey: null,

            isFirstTime
        };

        if (isFirstTime) {
            this.updateOrderView(project_id);
        }
    }

    updateOrderView(project_id) {
        uiApi.getOrderView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_ORDER_VIEW', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    onChangeFilter(filter) {
        const {timeoutKey} = this.state;
        const before = 0.5 * 1000; // 0.5s

        if (timeoutKey) clearTimeout(timeoutKey);

        const newTimeoutKey = setTimeout(() => {
            this.updateOrderList(filter);
            this.setState({timeoutKey: null});
        }, before);

        this.setState({filter, timeoutKey: newTimeoutKey});
    }

    updateOrderList(filter = this.state.filter) {
        this.setState({isLoading: true});

        getOrders({status: ORDER_STATUS.EXPORTED_ORDER, ...filter})
            .then(res => this.setState({orders: res.orders, isLoading: false}));
    }

    reloadOrders() {
        this.updateOrderList();
    }

    onCloseDetailModal(updatedOrder) {
        if (updatedOrder) {
            this.updateOrderList();
        }

        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedOrder) {
        this.setState({selectedOrder, isShownDetailModal: true});
    }

    onCloseCreateTransportOrderModal(updatedOrder) {
        if (updatedOrder) {
            this.updateOrderList();
        }

        this.setState({isShownCreateTransportOrderModal: false});
    }

    onOpenCreateTransportOrderModal(selectedOrder) {
        this.setState({selectedOrder, isShownCreateTransportOrderModal: true});
    }

    onOpenTransportOrderDetailModal(order_id) {
        this.setState({selectedOrderId: order_id, isShownTransportOrderDetailModal: true});
    }

    onCloseTransportOrderDetailModal() {
        this.setState({isShownTransportOrderDetailModal: false});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            this.updateOrderList();
            getAllProviders()
                .then(res => this.setState({providers: res}));

            // update first view
            this.updateOrderView(nextProps.project._id);
        }
    }

    componentDidMount() {
        this.updateOrderList();
        getAllProviders()
            .then(res => this.setState({providers: res}));
    }

    render() {
        const {project} = this.props;

        const {
            orders,
            selectedOrder,
            selectedOrderId,
            isLoading,
            isShownDetailModal,
            isShownCreateTransportOrderModal,
            isShownTransportOrderDetailModal,
            providers,

            isFirstTime
        } = this.state;

        return (
            <Fragment>
                <FmsPageTitle title="Yêu cầu xuất hàng"
                              route={`${project.name}/Quản lí đơn hàng/Yêu cầu xuất hàng`}/>

                {
                    isFirstTime ? (
                        <FmsBlankPage title='Yêu cầu xuất đơn hàng'>
                            <p>
                                Bạn có thể tạo vận đơn và cập nhật vận đơn ở đây.
                            </p>
                        </FmsBlankPage>
                    ) : (
                        <div className="wrapper wrapper-content">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox">
                                        <div className="ibox-content">

                                            <FmsExportOrderSearchBar onChangeFilter={this.onChangeFilter.bind(this)}/>

                                            {
                                                isLoading ?
                                                    <FmsSpin size={25} center={true}/>
                                                    :
                                                    <FmsExportOrderTable
                                                        orders={orders}
                                                        project={project}
                                                        onReloadOrders={this.reloadOrders.bind(this)}
                                                        onSelectItem={this.onOpenDetailModal.bind(this)}
                                                        onSelectCreateTransportOrderModal={this.onOpenCreateTransportOrderModal.bind(this)}
                                                        onSelectTransportOrderDetailModal={this.onOpenTransportOrderDetailModal.bind(this)}
                                                    />
                                            }

                                            <FmsOrderDetailModal
                                                order={selectedOrder}
                                                project={project}
                                                onClose={this.onCloseDetailModal.bind(this)}
                                                isShown={isShownDetailModal}
                                                typeModalName='EXPORT_ORDER'
                                            />

                                            <FmsCreateTransportOrderModal
                                                order={selectedOrder}
                                                onClose={this.onCloseCreateTransportOrderModal.bind(this)}
                                                isShown={isShownCreateTransportOrderModal}
                                                providers={providers}
                                            />

                                            <FmsTransportOrderDetailModal
                                                order_id={selectedOrderId}
                                                onClose={this.onCloseTransportOrderDetailModal.bind(this)}
                                                isShown={isShownTransportOrderDetailModal}
                                                providers={providers}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Fragment>
        )
    }
}

export default FmsExportOrders;