import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsStaffsBody from "./FmsStaffsBody";

class FmsStaffs extends Component {

    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle title="Nhân viên" route={`${projectName}/Quản lí nhân viên/Nhân viên`}/>

                {
                    project
                        ? <FmsStaffsBody project={project}/>
                        : null
                }
            </Fragment>
        )
    }
}


export default FmsStaffs;