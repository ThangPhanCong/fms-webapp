import React, {Component} from 'react';
import {Alert, AlertContainer} from "react-bs-notifier";
import {Switch, Redirect} from 'react-router-dom';
import uuid from 'uuid';
import FmsLoading from '../commons/FmsLoading/FmsLoading';
import FmsRoute from '../commons/FmsRoute';
import {ALERT_TIME_DISMIS} from '../constants/alert';
import FmsProgress from "../commons/FmsProgress/FmsProgress";
import {registerNotiCenter} from "./notification/NotificationService";
import Loadable from 'react-loadable';
import trackUserBehavior from 'utils/track-user-behavior';
import embedMessengerSupport from 'utils/messenger-support-embeded';
import {AuthenService} from "../services/AuthenService";

const LoadableFmsLogin = Loadable({
    loader: () => import('./login/FmsLogin'),
    loading: FmsLoading
});

const LoadableFmsDashboard = Loadable({
    loader: () => import('./project-dashboard/layouts/Main'),
    loading: FmsLoading
});

const LoadableFmsUserSettings = Loadable({
    loader: () => import('./user-settings/FmsUserSettings'),
    loading: FmsLoading
});

const LoadableFmsProject = Loadable({
    loader: () => import('./project/FmsProject'),
    loading: FmsLoading
});

const LoadableFmsForgetPassword = Loadable({
    loader: () => import('./forget-password/FmsForgetPassword'),
    loading: FmsLoading
});

const LoadableFmsResetPassword = Loadable({
    loader: () => import('./reset-password/FmsResetPassword'),
    loading: FmsLoading
});

class FmsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alerts: []
        };
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const access_token = params.get('access_token');

        AuthenService.register(this, () => {this.forceUpdate()});
        AuthenService.verifyAccessToken(access_token);
        registerNotiCenter(this.noti.bind(this));

        // init facebook messenger support
        if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'staging') {
            embedMessengerSupport();
        }

        LoadableFmsProject.preload();
        LoadableFmsDashboard.preload();
        LoadableFmsUserSettings.preload();
    }

    componentWillUnmount() {
        AuthenService.unregister(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && process.env.NODE_ENV === 'production') {
            trackUserBehavior(nextProps.user);
        }
    }

    noti(type, message) {
        const {alerts} = this.state;

        const alert = {
            id: uuid(),
            type: type,
            message: message
        };

        this.setState({alerts: alerts.concat([alert])});

        setTimeout(() => {
            this.removeNoti(alert.id);
        }, ALERT_TIME_DISMIS);
    }

    removeNoti(a_id) {
        let self = this;

        let alerts = self.state.alerts;
        let filterAlerts = alerts.filter(a => a.id !== a_id);

        self.setState({alerts: filterAlerts});
    }

    renderAlerts() {
        let self = this;
        let alerts = self.state.alerts;
        let alertItems = alerts.map(alert => {
            return (
                <Alert key={alert.id} type={alert.type} onDismiss={() => {
                    self.removeNoti(alert.id)
                }}>{alert.message}</Alert>
            )
        });

        return (
            <AlertContainer>
                {alertItems}
            </AlertContainer>
        )
    }

    render() {
        if (AuthenService.isLoading()) {
            return (
                <FmsLoading/>
            )
        } else {
            if (AuthenService.isAuthenticated()) {
                return (
                    <div>
                        {
                            this.renderAlerts()
                        }

                        <FmsProgress/>

                        <Switch>
                            <FmsRoute exact path="/shops" component={LoadableFmsProject}/>
                            <FmsRoute path="/settings" component={LoadableFmsUserSettings}/>
                            <FmsRoute path="/shops/:project_alias" component={LoadableFmsDashboard}/>

                            <Redirect to="/shops"/>
                        </Switch>


                    </div>
                )
            } else {
                return (
                    <Switch>
                        <FmsRoute exact path="/login" component={LoadableFmsLogin}/>
                        <FmsRoute path="/forget-password" component={LoadableFmsForgetPassword}/>
                        <FmsRoute path="/reset-password" component={LoadableFmsResetPassword}/>



                        <Redirect to="/login"/>
                    </Switch>
                )
            }
        }
    }
}

export default FmsApp;
