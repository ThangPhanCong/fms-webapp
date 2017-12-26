import React from 'react';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import {correctHeight, detectBody, flatStructure} from './Helpers';
import {Redirect, Route, Switch} from "react-router-dom";
import RightSideBar from "../common/RightSideBar";

import navItems from '../common/NavItemConfig'


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

                <Redirect to={this.props.match.url + "/dashboard"} />

            </Switch>
        )
    }
}

export default Main