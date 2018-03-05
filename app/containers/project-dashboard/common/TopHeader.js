import React from 'react';

import profileMockup from '../../../assets/images/mockup/profile_small.jpg';
import {smoothlyMenu} from '../layouts/Helpers';
import {Link} from "react-router-dom";
import {flatConfig} from "./RouteConfig";
import {getRouteNameAtLevel} from "../../../utils/route-utils";
import {setAlias} from "../../../actions/dashboard/conversations";
import FmsNotificationPopup from "../../notifimanager/notify-popup/FmsNotificationPopup";
import * as tokenApi from "../../../api/TokenApi";
import * as store from "../../../helpers/storage";
import {connect} from "react-redux";

class TopHeader extends React.Component {

    state = {
        color: 'white',
        hasBorderBottom: false
    };

    componentDidMount() {
        this.updateColorByLocation();
    }

    componentWillReceiveProps(nextProps) {
        this.updateColorByLocation(nextProps.location);
    }

    updateColorByLocation(location) {
        const {pathname} = location || this.props.location;
        const currRouteName = getRouteNameAtLevel(pathname, 3);
        if (currRouteName) {
            const currRoute = flatConfig.find(r => r.route === currRouteName);
            if (currRoute) {
                this.changeColor(currRoute.headerColor);
                this.changeBorderBottom(currRoute.hasBorderBottom);
            }
        }
    }

    changeColor(color) {
        this.setState({color});
    }

    changeBorderBottom(hasBorderBottom) {
        this.setState({hasBorderBottom});
    }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    renderProjectItems() {
        let projects = store.get('projects');

        if (projects.length === 0) {
            return null;
        }

        const {project_alias} = this.props.match.params;
        const currProject = projects.find(project => project.data.alias === project_alias);
        projects = projects.filter(p => p.data.alias !== project_alias);
        const currRoute = this.props.location.pathname.split('/').pop();

        return (
            <ul className="nav navbar-top-links navbar-left">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" style={{color: 'gray'}}>
                        {currProject.data.name}
                        <span> </span>
                        {
                            projects.length > 0 ? <i className="fa fa-caret-down"/>
                                : null
                        }
                    </a>
                    <ul className="dropdown-menu dropdown-header-with-text">
                        {
                            projects.map(
                                (project, i) =>
                                    (
                                        <li key={project.data._id} className="">
                                            <Link to={`/shops/${project.data.alias}/${currRoute}`}
                                                  replace>{project.data.name}
                                            </Link>
                                        </li>
                                    )
                            )
                        }
                    </ul>
                </li>
            </ul>
        )
    }

    renderRightNavItem() {
        const {
            _id
        } = this.props.user;

        return (
            <ul className="nav navbar-top-links navbar-right">
                <FmsNotificationPopup _id={_id}
                />
            </ul>
        )
    }

    render() {
        const {
            color,
            hasBorderBottom
        } = this.state;

        return (
            <div className={`row border-bottom ${hasBorderBottom ? 'border-bottom-nav' : ''}`}>
                <nav className="navbar navbar-static-top" role="navigation"
                     style={{marginBottom: 0, backgroundColor: color}}>

                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                           onClick={this.toggleNavigation} href="#">
                            <i className="fa fa-bars"/>
                        </a>

                        {
                            this.renderProjectItems()
                        }
                    </div>

                    {
                        this.renderRightNavItem()
                    }
                </nav>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(TopHeader);
