import React from "react";
import routesNoti from "../containers/notifimanager/notification-dashboard/RouteNotiConfig";
import {Route} from "react-router-dom";

export default function notiRoute(component) {
    switch (component) {
        case "main":
            return routesNoti.map((route, index) => (
                <Route
                    key={index}
                    name={route.name}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
            ))
            break;
    }


}