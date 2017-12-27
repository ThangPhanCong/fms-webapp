import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, AlertContainer} from "react-bs-notifier";
import {Switch, Redirect, withRouter} from 'react-router-dom';
import uuid from 'uuid';
import propTypes from 'prop-types';

import FmsLogin from './login/FmsLogin';
import FmsProject from './project/FmsProject';
import ProjectDashboard from './project-dashboard/layouts/Main';
import FmsLoading from '../commons/FmsLoading/FmsLoading';
import FmsRoute from '../commons/FmsRoute';
import {ALERT_TIME_DISMIS} from '../constants/alert';
import {verifyAccessToken} from '../actions/auth';
import FmsProgress from "../commons/FmsProgress/FmsProgress";
import {registerNotiCenter} from "./notification/NotificationService";

class FmsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alerts: [],
            isLoading: true
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;

        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const access_token = params.get('access_token');

        dispatch(verifyAccessToken(access_token));

        // register notification center
        registerNotiCenter(this.noti.bind(this));
    }

    noti(type, message) {
        let self = this;

        let alert = {
            id: uuid(),
            type: type,
            message: message
        };

        let alerts = self.state.alerts;
        alerts.push(alert);
        self.setState({alerts: alerts});

        setTimeout(() => {
            self.removeNoti(alert.id);
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
        const {isLoading, isAuthenticated} = this.props;

        if (isLoading) {
            return (
                <FmsLoading/>
            )
        } else {
            if (isAuthenticated) {
                return (
                    <div>
                        {
                            this.renderAlerts()
                        }

                        <FmsProgress/>

                        <Switch>
                            <FmsRoute exact path="/shops" component={FmsProject}/>
                            <FmsRoute path="/shops/:project_alias" component={ProjectDashboard}/>

                            <Redirect to="/shops"/>
                        </Switch>

                    </div>
                )
            } else {
                return (
                    <Switch>
                        <FmsRoute exact path="/" component={FmsLogin} noti={this.noti.bind(this)}/>
                        <Redirect to="/"/>
                    </Switch>
                )
            }
        }
    }
}

FmsApp.propTypes = {
    isLoading: propTypes.bool.isRequired,
    isAuthenticated: propTypes.bool.isRequired,
    user: propTypes.object
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
};

export default withRouter(connect(mapStateToProps)(FmsApp));
