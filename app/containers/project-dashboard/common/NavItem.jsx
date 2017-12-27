import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {flatStructure} from "../../../utils/data-structure-utils";

class NavItem extends Component {

    activeRoute(...routeName) {
        return this.isActive(...routeName) ? "active" : "";
    }

    secondLevelActive(...routeName) {
        return this.isActive(...routeName) ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    isActive(...routes) {
        for (let route of routes) {
            if (!route || route === '#') {
                continue;
            }

            const {pathname} = this.props.location;

            if (pathname.split('/').includes(route)) {
                return true;
            }
        }

        return false;
    }

    renderSecondLevel(navChilds) {
        const routes = navChilds.map(c => c.route);

        return (
            <ul className={this.secondLevelActive(...routes)}>
                {
                    navChilds.map(
                        (c, i) => <li key={i} className={this.activeRoute(c.route)}><Link to={c.route}>{c.title}</Link></li>
                    )
                }
            </ul>
        )
    }

    render() {
        const {navItem} = this.props;
        const routes = flatStructure([navItem]).map(item => item.route);

        return (
            <li className={this.activeRoute(...routes)}>
                <Link to={navItem.route || '#'}>
                    <i className={"fa " + navItem.icon}/>
                    <span className="nav-label">{navItem.title}</span>
                </Link>

                {
                    (navItem.children && navItem.children.length > 0) ?
                        this.renderSecondLevel(navItem.children) : null
                }
            </li>
        )
    }
}

export default NavItem;