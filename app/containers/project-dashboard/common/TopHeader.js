import React from 'react';

import profileMockup from '../../../assets/images/mockup/profile_small.jpg';
import {smoothlyMenu} from '../layouts/Helpers';
import {getAllProjects} from "../../../api/ProjectApi";
import {Link} from "react-router-dom";
import {flatConfig} from "./RouteConfig";
import {getRouteNameAtLevel} from "../../../utils/route-utils";
import {setAlias} from "../../../actions/dashboard/conversations";
import FmsNotificationPopup from "../../notifimanager/notify-popup/FmsNotificationPopup";
import * as tokenApi from "../../../api/TokenApi";
import * as store from "../../../helpers/storage";

class TopHeader extends React.Component {

    state = {
        projects: [],
        users: [],
        _id: null,
        color: 'white',
        hasBorderBottom: false
    };

    componentDidMount() {
        getAllProjects()
            .then(projects => {
                this.setState({projects});
            })
            .catch(err => console.log(err));

        this.updateColorByLocation();
        this.getIdCurrentUser();

    }

    getIdCurrentUser() {
        tokenApi.verifyAccessToken(store.get('access_token'))
            .then(userData => {
                this.setState({
                    _id: userData._id
                })
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    componentWillMount() {
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
        let {projects} = this.state;

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
                        {currProject.data.name} <i className="fa fa-caret-down"/>
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
            users,
            _id
        } = this.state;

        return (
            <ul className="nav navbar-top-links navbar-right">
                <FmsNotificationPopup users={users}
                                      _id={_id}
                />
                {/*<li>*/}
                {/*<a className="right-sidebar-toggle" onClick={() => {*/}
                {/*this.props.onToggleRightNavbar()*/}
                {/*}}>*/}
                {/*<i className="fa fa-tasks"></i>*/}
                {/*</a>*/}
                {/*</li>*/}
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

export default TopHeader;