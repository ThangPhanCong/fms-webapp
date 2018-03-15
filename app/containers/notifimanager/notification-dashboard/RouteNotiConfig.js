import React from 'react';
import FmsTableNotification from "./FmsTableNotification";
import FmsDetailNotificationItem from "./FmsDetailNotificationItem";
import FmsArchiveNotification from "./FmsArchiveNotification";

const routesNoti = [
    {
        path: "/notifications",
        exact: true,
        main: () => <FmsTableNotification/>
    },
    {
        path: "/notifications/archived",
        main: (props) => <FmsArchiveNotification {...props}/>
    },
    {
        path: "/notifications/:id",
        main: (props) => <FmsDetailNotificationItem {...props} />
    }
];

export default routesNoti;
