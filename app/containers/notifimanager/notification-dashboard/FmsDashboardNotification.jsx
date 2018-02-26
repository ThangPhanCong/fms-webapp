import React, {Component} from 'react';
import {Switch} from "react-router-dom";
import notiRoute from "../../../utils/routeNoti-util";
import FmsNavLeftNotification from "./FmsNavLeftNotification";
import FmsNavigation from "../../../commons/FmsNavigation/FmsNavigation";

class FmsDashboardNotification extends Component {
    render() {
        return (
            <div>
                <FmsNavigation/>
                <div className="row">
                    <FmsNavLeftNotification/>
                    <div className="col-sm-10">
                        <Switch>
                            {notiRoute("main")}
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsDashboardNotification;