import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import AllOrderBody from "./all-orders/AllOrderBody";

class FmsAllOrders extends Component {
    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        console.log('FmsAllOrders project', project);

        return (
            <Fragment>
                <FmsPageTitle title="Tất cả đơn hàng" route={`${projectName}/Quản lí đơn hàng/Tất cả đơn hàng`}/>

                {
                    project
                        ? <AllOrderBody project={project}/>
                        : null
                }
            </Fragment>
        )
    }
}


export default FmsAllOrders;