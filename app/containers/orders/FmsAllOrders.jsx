import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import AllOrderBody from "./all-orders/AllOrderBody";

class FmsAllOrders extends Component {
    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Tất cả đơn hàng" route={`${projectName}/Quản lí đơn hàng/Tất cả đơn hàng`}/>,

                <AllOrderBody key={2} project={project}/>
            ]
        )
    }
}


export default FmsAllOrders;