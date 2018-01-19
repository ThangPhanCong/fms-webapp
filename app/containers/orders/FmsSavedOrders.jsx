import React, {Component, Fragment} from 'react';
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
            <Fragment>
                <FmsPageTitle
                    title="Lưu trữ đơn hàng"
                    route={`${projectName}/Quản lí đơn hàng/Lưu trữ đơn hàng`}
                />

                {
                    project
                        ? <FmsSavedOrderBody project={project}/>
                        : null
                }
            </Fragment>
        )
    }
}


export default FmsSavedOrders;