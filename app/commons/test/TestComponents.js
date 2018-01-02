import React from 'react';
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FmsButtonTest from '../FmsButton/FmsButtonTest'
import FmsLoadingTest from '../FmsLoading/FmsLoading'
import FmsToolTipTest from '../FmsToolTip/FmsToolTip'
import FmsTabTest from "../FmsTabs/FmsTabTest";

const TestComponent = ({match}) => (
    <div>
        <ul>
            <li>
                <Link to={`${match.url}/fmsbutton`}>
                    FmsButton
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsloading`}>
                    FmsLoading
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmstab`}>
                    FmsTab
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/fmsbutton`} component={FmsButtonTest}/>
        <Route path={`${match.url}/fmsloading`} component={FmsLoadingTest}/>
        <Route path={`${match.url}/fmstab`} component={FmsTabTest}/>
    </div>
);

export default TestComponent
