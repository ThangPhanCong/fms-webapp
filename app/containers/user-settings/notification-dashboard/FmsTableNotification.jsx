import React, {Component} from 'react';
import {getNotifications} from "../../../api/NotificationsApi";
import FmsNotificationItem from "./FmsNotificationItem";
import {AuthenService} from "../../../services/AuthenService";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";

class FmsTableNotification extends Component {
    state = {
        notifications: [],
        isLoading: false
    };

    componentDidMount() {
        this.getNotification();
    }

    async getNotification() {
        this.setState({isLoading: true});

        const {_id} = AuthenService.getUser();

        try {
            const data = await getNotifications(_id, 'BASE');
            this.setState({
                notifications: data.filter(n => !n.is_archived).reverse()
            })
        } catch (err) {
            alert(err.message)
        }

        this.setState({isLoading: false});
    }

    render() {
        const {notifications, isLoading} = this.state;
        const {match} = this.props;

        if (isLoading) {
            return (
                <div style={{textAlign: 'center'}}>
                    <FmsSpin size={25}/>
                </div>
            )
        }

        return (
            <div className='ibox'>
                <h2>Thông báo</h2>
                <div className="ibox-content">
                    {
                        notifications.length !== 0 ?
                            <table className="table table-mail table-hover"
                                   style={notifications.length !== 0 ? {border: "solid 0.2px #EEEEEE"} : null}>
                                <tbody>
                                {
                                    notifications.map((noti, i) => {
                                        return (
                                            <FmsNotificationItem
                                                noti={noti}
                                                key={i}
                                                link={match.url + `/${noti._id}`}
                                            />
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            : <p>Không có thông báo mới!</p>
                    }
                </div>
            </div>
        )
    }
}

export default FmsTableNotification;
