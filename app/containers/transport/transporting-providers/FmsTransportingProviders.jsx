import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../../commons/page-title/FmsPageTitle";
import FmsTransportingProviderTable from "./FmsTransportingProviderTable";

class FmsTransportingProviders extends Component {

    render () {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle key={1} title="Đơn vị vận chuyển"
                    route={`${projectName}/Quản lí vận chuyển/Đơn vị vận chuyển`}/>

                <div key={2} className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <FmsTransportingProviderTable project_id={project._id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FmsTransportingProviders;