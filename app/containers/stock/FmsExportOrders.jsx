import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsExportOrderSearchBar from "../orders/all-orders/FmsExportOrderSearchBar";
import FmsExportOrderTable from "./FmsExportOrderTable";
import {getExportOrders} from "../../api/OrderApi";

class FmsExportOrders extends Component {

    state = {
        project: null,
        orders: [],
        isLoading: true,
    };

    componentWillReceiveProps(nextProps) {
        const {project} = this.state;
        if (!project || (nextProps.project && nextProps.project.alias !== project.alias)) {
            this.setState({project: nextProps.project});
            this.updateOrderList(nextProps.project);
        }
    }

    updateOrderList(project) {
        project = project || this.props.project;
        this.setState({isLoading: true});

        if (project) {
            getExportOrders(project.alias)
                .then(orders => this.setState({orders, isLoading: false}));
        }
    }

    reloadOrders() {
        const {project} = this.props;
        this.updateOrderList(project);
    }

    render() {
        const {project} = this.props;
        const {
            orders,
            isLoading,
        } = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Yêu cầu xuất hàng" route={`${projectName}/Quản lí kho/Yêu cầu xuất hàng`}/>,

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <FmsExportOrderSearchBar />

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/>
                                            : <FmsExportOrderTable orders={orders} project={project}
                                                               onReloadOrders={this.reloadOrders.bind(this)}/>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}


export default FmsExportOrders;