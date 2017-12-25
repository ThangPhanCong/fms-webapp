import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import {correctHeight, detectBody} from './Helpers';
import MinorView from "../views/Minor";
import MainView from "../views/Main";
import {Route, Switch} from "react-router-dom";
import RightSideBar from "../common/RightSideBar";

class Main extends React.Component {

    state = {
        showRightNavbar: false
    };

    toggleRightNavbar () {
        this.setState({showRightNavbar: !this.state.showRightNavbar})
    }

    render () {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        return (
            <div id="wrapper">
                <Progress />
                <Navigation
                    location={this.props.location}
                />

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader onToggleRightNavbar={() => {this.toggleRightNavbar()}}/>

                    <Switch>
                        <Route path="main" component={MainView}> </Route>
                        <Route path="minor" component={MinorView}> </Route>
                    </Switch>

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
}

export default Main