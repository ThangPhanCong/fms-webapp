import React, {Component} from 'react';
import FmsNotificationItem from "./FmsNotificationItem";
import FmsButtonNotification from "./FmsButtonNotification";
import FmsCheckbox from "../../../commons/checkbox/FmsCheckbox";

class FmsListNotification extends Component {
    state = {
        check_all: false,
        notifications: [
            {
                id: 0,
                title: "Mailchip",
                content: "There are many variations of passages of Lorem Ipsum.",
                is_checked: false,
                time_notification: "December 16, 2017"
            },
            {
                id: 1,
                title: "Facebook",
                content: "Many desktop publishing packages and web page editors." +
                " Xin cảm ơn!",
                is_checked: true,
                time_notification: "December 8, 2017"
            }
        ]
    }

    onSelectNotification(noti) {
        const {notifications} = this.state;

        notifications.forEach(p => {
            if (p.id == noti.id) p.is_checked = !p.is_checked
        })
        this.setState({notifications})
    }

    onSelectAllNotifications() {
        const {notifications, check_all} = this.state;

        notifications.forEach(p => {
            p.is_checked = !check_all
        })
        this.setState({
            notifications,
            check_all: !check_all
        })
    }

    navigateToProject(projectAlias) {
        const {history} = this.props;
        history.push(`/shops/${projectAlias}`);
    }

    renderFoldersNotification() {
        return (
            <div className="ibox">
                <div className="ibox-content mailbox-content">
                    <div className="file-manager">
                        <a className="btn btn-block btn-primary"
                           onClick={() => this.navigateToProject('ad')}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            Trang chủ
                        </a>
                        <div className="space-25"></div>
                        <h5>Thư mục</h5>
                        <ul className="folder-list m-b-md">
                            <li>
                                <a href="#">
                                    <i className="fa fa-inbox "></i> Thông báo
                                    <span className="label label-warning pull-right">16</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-file-text-o"></i> Lưu trữ
                                    <span className="label label-danger pull-right">2</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    renderItemNotification() {
        const {notifications, check_all} = this.state;

        return (
            <table className="table table-hover table-mail">
                <tbody>
                <tr>
                    <td className="check-mail">
                        <FmsCheckbox checked={check_all} onChange={() => this.onSelectAllNotifications()}/>
                    </td>
                    <td>
                        <span className="check-all">Tất cả</span>
                    </td>
                    <td colSpan={3}>
                    </td>
                </tr>
                {
                    notifications.map((noti) => {
                        return <FmsNotificationItem key={noti.id}
                                                    title={noti.title}
                                                    content={noti.content}
                                                    is_checked={noti.is_checked}
                                                    onSelectNotification={() => this.onSelectNotification(noti)}/>
                    })
                }
                </tbody>
            </table>
        )
    }

    render() {

        return (
            <div className="wrapper wrapper-content" style={{backgroundColor: '#f3f2f2', height: '100vh'}}>
                <div className="row">
                    <div className="col-lg-3">
                        {this.renderFoldersNotification()}
                    </div>
                    <div className="col-lg-9 animated fadeInRight content-notification">
                        <div className="mail-box-header">
                            <h2>Thông báo (16)</h2>
                            <FmsButtonNotification/>
                        </div>
                        <div className="mail-box">
                            {this.renderItemNotification()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsListNotification;
