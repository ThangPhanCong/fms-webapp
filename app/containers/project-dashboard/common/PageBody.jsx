import React, {Component} from "react";
import {treeConfig, filterConfigByPerms} from "./RouteConfig";
import {Redirect, Switch} from "react-router-dom";
import FmsRoute from "../../../commons/FmsRoute";
import {flatStructure} from "../../../utils/data-structure-utils";

class PageBody extends Component {

    render() {
        const {project} = this.props;

        if (!project) return null;

        const flatConfig = flatStructure(filterConfigByPerms(treeConfig, project.role.permissions));

        // console.log('flatConfig', flatConfig)

        return (
            <Switch>
                {
                    flatConfig.map(
                        (container, i) =>
                            <FmsRoute
                                key={i}
                                path={this.props.match.url + "/" + container.route}
                                project={project.data}
                                component={container.component}
                            />
                    )
                }

                <Redirect to={this.props.match.url + '/' + flatConfig[0].route}/>

            </Switch>
        )
    }
}

export default PageBody;