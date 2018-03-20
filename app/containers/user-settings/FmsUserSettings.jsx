import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import FmsNavLeftNotification from "./FmsLeftNavBarSettings";
import FmsNavigation from "../../commons/FmsNavigation/FmsNavigation";
import FmsTableNotification from "./notification-dashboard/FmsTableNotification";
import FmsArchiveNotification from "./notification-dashboard/FmsArchiveNotification";
import FmsDetailNotificationItem from "./notification-dashboard/FmsDetailNotificationItem";
import FmsUserSettingsGeneral from "./general/FmsUserSettingsGeneral";
import FmsUserSecurity from "./security/FmsUserSecurity";

class FmsUserSettings extends Component {
    render() {
        const {match} = this.props;

        return (
            <div>
                <FmsNavigation show_noti={false} redirect_shop={true}/>

                <div className="container">
                    <div className="row noti-page-wrapper">
                        <div className='col-sm-3'>
                            <FmsNavLeftNotification {...this.props}/>
                        </div>

                        <div className="col-sm-6">
                            <Switch>
                                <Route path={match.url + "/general"} exact component={FmsUserSettingsGeneral} />
                                <Route path={match.url + "/security"} exact component={FmsUserSecurity} />

                                <Route path={match.url + "/notifications"} exact component={FmsTableNotification} />
                                <Route path={match.url + "/notifications/:id"} component={FmsDetailNotificationItem} />
                                <Route path={match.url + "/notifications-archived"} exact component={FmsArchiveNotification} />
                                <Route path={match.url + "/notifications-archived/:id"} component={FmsDetailNotificationItem} />

                                <Redirect to={match.url + '/general'}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsUserSettings;