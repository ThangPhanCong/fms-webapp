import React from 'react';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import {correctHeight, detectBody} from './Helpers';
import RightSideBar from "../common/RightSideBar";
import PageBody from "../common/PageBody";
import * as storage from "helpers/storage";
import {setProjectId} from "../../../helpers/token-getter";

class Main extends React.Component {

    state = {
        showRightNavbar: false,
        project: null
    };

    constructor(props) {
        super(props);

        // const {match, history} = props;
        // this.verifyProjectRoute(match, history);
    }

    toggleRightNavbar() {
        this.setState({showRightNavbar: !this.state.showRightNavbar})
    }

    registerCorrectHeightMenu() {
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

    verifyProjectRoute(match, history) {
        const {project_alias} = match.params;
        const projects = storage.get('projects');
        const currentProject = projects ? projects.find(p => p.data.alias === project_alias) : null;
        if (!currentProject) history.replace('/shops');

        this.registerProjectTokenId(currentProject.data._id);
        this.setState({project: currentProject});
    }

    registerProjectTokenId(id) {
        setProjectId(id);
    }

    componentDidMount() {
        this.registerCorrectHeightMenu();

        const {match, history} = this.props;
        this.verifyProjectRoute(match, history);
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;

        if (nextProps.match) {
            this.verifyProjectRoute(nextProps.match, history);
        }
    }

    render() {
        const {
            showRightNavbar,
            project
        } = this.state;

        return (
            <div id="wrapper">
                <Navigation
                    location={this.props.location}
                    project={project}
                />

                <div id="page-wrapper" className='gray-bg'>

                    <TopHeader
                        {...this.props}
                        project={project}

                        onToggleRightNavbar={() => {
                            this.toggleRightNavbar()
                        }}
                    />

                    <PageBody
                        {...this.props}
                        project={project}
                    />

                    {/*<Footer/>*/}

                </div>

                {
                    showRightNavbar ? <RightSideBar/> : null
                }

            </div>

        )
    }

}

export default Main;