import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";

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

                <div key={2} className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center m-t-lg">
                                <h1>
                                    Tất cả đơn hàng
                                </h1>
                                <small>
                                    It is an application skeleton for a typical web app. You can use it to quickly bootstrap
                                    your webapp projects.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}


export default FmsAllOrders;