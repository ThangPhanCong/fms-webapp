import React from 'react';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import {correctHeight, detectBody} from './Helpers';
import MinorView from "../views/Minor";
import {Redirect, Route, Switch} from "react-router-dom";
import RightSideBar from "../common/RightSideBar";
import Dashboard from "../views/Dashboard";

import navItems from '../common/NavItemConfig'

function flatStructure(treeConfig) {
    if (Array.isArray(treeConfig) && treeConfig.length > 0) {
        let flatConfig = [];

        for (let item of treeConfig) {
            if (Array.isArray(item.children) && item.children.length > 0) {
                flatConfig = flatConfig.concat(flatStructure(item.children));
            } else {
                flatConfig.push(item);
            }
        }

        return flatConfig;
    } else {
        return [];
    }
}

const containers = flatStructure(navItems);

class Main extends React.Component {

    state = {
        showRightNavbar: false
    };

    toggleRightNavbar() {
        this.setState({showRightNavbar: !this.state.showRightNavbar})
    }

    render() {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        return (
            <div id="wrapper">
                <Navigation
                    location={this.props.location}
                />

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader onToggleRightNavbar={() => {
                        this.toggleRightNavbar()
                    }}/>

                    {
                        this.renderBodyPage()
                    }

                    <Footer/>

                </div>

                {
                    this.state.showRightNavbar ? <RightSideBar/> : null
                }

            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function () {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }


    renderBodyPage() {
        console.log('containers', containers);
        return (
            <Switch>
                {
                    containers.map(
                        (container, i) =>
                            <Route key={i} path={this.props.match.url + "/" + container.route} component={container.component} />
                    )
                }
            </Switch>
        )
    }
}

export default Main