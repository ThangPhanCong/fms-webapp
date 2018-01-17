import React from 'react';
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom';
import FmsLoadingTest from '../FmsLoading/FmsLoading'
import FmsTabTest from "../FmsTabs/FmsTabTest";
import FmsCheckboxTest from "../checkbox/FmsCheckboxTest";
import FmsFlotChartTest from "../charts/FmsFlotChart/FmsFlotChartTest";
import FmsLineChartTest from "../charts/FmsLineChart/FmsLineChartTest";
import FmsLineChartCanvasTest from "../charts/FmsLineChartCanvas/FmsLineChartCanvasTest";
import FmsDatePickerTest from "../date-picker/FmsDatePickerTest";
import FmsSwitchTest from '../FmsSwitch/FmsSwitchTest';
import FmsOrderDetailModalTest from "../order-modal/FmsOrderDetailModalTest";
import FmsTimelineTest from '../FmsTimeline/FmsTimelineTest';
import FmsSearchDropdownTest from "../search-dropdown/FmsSearchDropdownTest";

const TestComponent = ({match}) => (
    <div>
        <ul>
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
                <Link to={`${match.url}/fmslinechart`}>
                    FmsLineChart
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmslinechartcanvas`}>
                    FmsLineChartCanvas
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsdatepicker`}>
                    FmsDatePickerTest
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsswitch`}>
                    FmsSwitchTest
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmsdetailordermodal`}>
                    FmsOrderDetailModalTest
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmstimeline`}>
                    FmsTimelineTest
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/fmssearchdropdown`}>
                    FmsSearchDropdownTest
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/fmsloading`} component={FmsLoadingTest}/>
        <Route path={`${match.url}/fmstab`} component={FmsTabTest}/>
        <Route path={`${match.url}/fmscheckbox`} component={FmsCheckboxTest}/>
        <Route path={`${match.url}/fmsflotchart`} component={FmsFlotChartTest}/>
        <Route path={`${match.url}/fmslinechart`} component={FmsLineChartTest}/>
        <Route path={`${match.url}/fmslinechartcanvas`} component={FmsLineChartCanvasTest}/>
        <Route path={`${match.url}/fmsdatepicker`} component={FmsDatePickerTest}/>
        <Route path={`${match.url}/fmsswitch`} component={FmsSwitchTest}/>
        <Route path={`${match.url}/fmsdetailordermodal`} component={FmsOrderDetailModalTest}/>
        <Route path={`${match.url}/fmstimeline`} component={FmsTimelineTest}/>
        <Route path={`${match.url}/fmssearchdropdown`} component={FmsSearchDropdownTest}/>
    </div>
);

export default TestComponent
