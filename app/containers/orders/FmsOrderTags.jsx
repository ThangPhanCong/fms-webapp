import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsOrderTagBody from "./tags/FmsOrderTagBody";


class FmsTagOrders extends Component {

    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Thẻ màu" route={`${projectName}/Quản lí đơn hàng/Thẻ màu`}/>,

                <FmsOrderTagBody key={2} project={project}/>
            ]
        )
    }
}


export default FmsTagOrders;