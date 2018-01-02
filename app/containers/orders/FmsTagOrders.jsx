import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";


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

                <div key={2} className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center m-t-lg">
                                <h1>
                                    Thẻ màu
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


export default FmsTagOrders;