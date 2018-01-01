import React, {Component} from "react";
import {flatConfig} from "./RouteConfig";
import {Redirect, Switch} from "react-router-dom";
import {getProject} from "../../../api/ProjectApi";
import FmsRoute from "../../../commons/FmsRoute";

class PageBody extends Component {

    state = {
        project: null
    };

    componentDidMount() {
        const {project_alias} = this.props.match.params;

        getProject(project_alias)
            .then(project => {
                this.setState({project});
            })
    }

    render() {
        const {project} = this.state;
        return (
            <Switch>
                {
                    flatConfig.map(
                        (container, i) =>
                            <FmsRoute
                                key={i}
                                path={this.props.match.url + "/" + container.route}
                                project={project}
                                component={container.component}
                            />
                    )
                }

                <Redirect to={this.props.match.url + "/dashboard"}/>

            </Switch>
        )
    }
}

export default PageBody;