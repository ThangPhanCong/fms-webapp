import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import {getTransportingOrders} from "../../api/OrderApi";
import FmsTransportingSearchBar from "./transporting/FmsTransportingSearchBar";
import FmsTransportingTable from "./transporting/FmsTransportingTable";

class FmsTransporting extends Component {

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
            getTransportingOrders(project.alias)
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
                <FmsPageTitle key={1} title="Đang vận chuyển" route={`${projectName}/Quản lí kho/Đang vận chuyển`}/>,

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <FmsTransportingSearchBar />

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/>
                                            : <FmsTransportingTable orders={orders} project={project}
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


export default FmsTransporting;