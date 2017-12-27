import React from 'react';
import profileMockup from '../../../assets/images/mockup/profile_small.jpg';
import {smoothlyMenu} from '../layouts/Helpers';

class TopHeader extends React.Component {

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    renderProjectItems() {
        return (
            <ul className="nav navbar-top-links navbar-left">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" style={{color: 'gray'}}>
                        Shop bán giầy dép <i className="fa fa-caret-down"/>
                    </a>
                    <ul className="dropdown-menu dropdown-header-with-text">
                        <li className=""><a>Shop bán áo 1</a></li>
                        <li className=""><a>Shop bán áo 2</a></li>
                        <li className=""><a>Shop bán áo 3</a></li>
                    </ul>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation"
                     style={{marginBottom: 0, backgroundColor: 'white'}}>

                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                           onClick={this.toggleNavigation} href="#">
                            <i className="fa fa-bars"/>
                        </a>

                        {
                            this.renderProjectItems()
                        }
                    </div>

                    <ul className="nav navbar-top-links navbar-right">

                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-envelope"/> <span className="label label-warning">16</span>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src={profileMockup}/>
                                        </a>
                                        <div>
                                            <small className="pull-right">46h ago</small>
                                            <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br/>
                                            <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"/>
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src={profileMockup}/>
                                        </a>
                                        <div>
                                            <small className="pull-right text-navy">5h ago</small>
                                            <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>.
                                            <br/>
                                                <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="dropdown-messages-box">
                                        <a href="profile.html" className="pull-left">
                                            <img alt="image" className="img-circle" src={profileMockup}/>
                                        </a>
                                        <div>
                                            <small className="pull-right">23h ago</small>
                                            <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br/>
                                            <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="mailbox.html">
                                            <i className="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell"></i> <span className="label label-primary">8</span>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="mailbox.html">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="profile.html">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                            <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="grid_options.html">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="notifications.html">
                                            <strong>See All Alerts</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>


                        <li>
                            <a className="right-sidebar-toggle" onClick={() => {this.props.onToggleRightNavbar()}}>
                                <i className="fa fa-tasks"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default TopHeader