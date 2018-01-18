import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSavedOrderBody from "./saved-orders/FmsSavedOrderBody";


class FmsSavedOrders extends Component {

    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle
                    key={1}
                    title="Lưu trữ đơn hàng"
                    route={`${projectName}/Quản lí đơn hàng/Lưu trữ đơn hàng`}
                />,

                <FmsSavedOrderBody
                    key={2}
                    project={project}
                />
            ]
        )
    }
}


export default FmsSavedOrders;