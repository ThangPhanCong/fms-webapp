import React from 'react';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import {correctHeight, detectBody} from './Helpers';
import RightSideBar from "../common/RightSideBar";
import PageBody from "../common/PageBody";

class Main extends React.Component {

    state = {
        showRightNavbar: false
    };

    toggleRightNavbar() {
        this.setState({showRightNavbar: !this.state.showRightNavbar})
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

    render() {
        return (
            <div id="wrapper">
                <Navigation
                    location={this.props.location}
                />

                <div id="page-wrapper" className='gray-bg'>

                    <TopHeader
                        {...this.props}

                        onToggleRightNavbar={() => {
                            this.toggleRightNavbar()
                        }}
                    />

                    <PageBody {...this.props}/>

                    {/*<Footer/>*/}

                </div>

                {
                    this.state.showRightNavbar ? <RightSideBar/> : null
                }

            </div>

        )
    }

}

export default Main;