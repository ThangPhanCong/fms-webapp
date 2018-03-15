import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsSavedOrderBody from "./saved-orders/FmsSavedOrderBody";


class FmsSavedOrders extends Component {

    render() {
        const {project} = this.props;

        return (
            <Fragment>
                <FmsPageTitle
                    title="Lưu trữ đơn hàng"
                    route={`${project.name}/Quản lí đơn hàng/Lưu trữ đơn hàng`}
                />

                <FmsSavedOrderBody project={project}/>
            </Fragment>
        )
    }
}


export default FmsSavedOrders;