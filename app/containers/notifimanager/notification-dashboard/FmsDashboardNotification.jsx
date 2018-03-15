import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import FmsNavLeftNotification from "./FmsNavLeftNotification";
import FmsNavigation from "../../../commons/FmsNavigation/FmsNavigation";
import FmsTableNotification from "./FmsTableNotification";
import FmsArchiveNotification from "./FmsArchiveNotification";
import FmsDetailNotificationItem from "./FmsDetailNotificationItem";

class FmsDashboardNotification extends Component {
    render() {
        return (
            <div>
                <FmsNavigation show_noti={false} redirect_shop={true}/>

                <div className="container">
                    <div className="row noti-page-wrapper">
                        <div className='col-sm-3'>
                            <FmsNavLeftNotification/>
                        </div>

                        <div className="col-sm-8">
                            <Switch>
                                <Route path="/notifications" exact component={FmsTableNotification} />
                                <Route path="/notifications/archived" component={FmsArchiveNotification} />
                                <Route path="/notifications/:id" exact component={FmsDetailNotificationItem} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsDashboardNotification;