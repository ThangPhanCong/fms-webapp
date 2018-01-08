import React from 'react';
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FmsButtonTest from '../FmsButton/FmsButtonTest'
import FmsLoadingTest from '../FmsLoading/FmsLoading'
import FmsToolTipTest from '../FmsToolTip/FmsToolTip'
import FmsTabTest from "../FmsTabs/FmsTabTest";
import FmsCheckboxTest from "../FmsCheckbox/FmsCheckboxTest";
import FmsFlotChartTest from "../charts/FmsFlotChartTest";
import FmsDatePickerTest from "../date-picker/FmsDatePickerTest";

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
            <li>
                <Link to={`${match.url}/fmscheckbox`}>
                    FmsCheckbox
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsflotchart`}>
                    FmsFlotChart
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsdatepicker`}>
                    FmsDatePickerTest
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/fmsbutton`} component={FmsButtonTest}/>
        <Route path={`${match.url}/fmsloading`} component={FmsLoadingTest}/>
        <Route path={`${match.url}/fmstab`} component={FmsTabTest}/>
        <Route path={`${match.url}/fmscheckbox`} component={FmsCheckboxTest}/>
        <Route path={`${match.url}/fmsflotchart`} component={FmsFlotChartTest}/>
        <Route path={`${match.url}/fmsdatepicker`} component={FmsDatePickerTest}/>
    </div>
);

export default TestComponent
