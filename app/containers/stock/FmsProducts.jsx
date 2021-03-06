import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import {delay} from 'utils/timeout-utils';
import FmsProductsBody from "./products/FmsProductsBody";

class FmsProducts extends Component {

    render() {
        const {project} = this.props;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle title="Sản phẩm" route={`${projectName}/Quản lí kho/Sản phẩm`}/>

                {
                    project
                        ? <FmsProductsBody project={project}/>
                        : null
                }
            </Fragment>
        )
    }
}


export default FmsProducts;