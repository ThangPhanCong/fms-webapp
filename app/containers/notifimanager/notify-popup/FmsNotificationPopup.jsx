import React, {Component} from 'react';

class FmsNotificationPopup extends Component {

    renderDropdownNotification() {
        return (
            <li className="dropdown">
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <i className="fa fa-bell"></i>
                    <span className="label label-primary">8</span>
                </a>
                <ul className="dropdown-menu dropdown-alerts">
                    <li>
                        <a href="#">
                            <div>
                                <i className="fa fa-envelope fa-fw"></i> Gói cước đã hết hạn!
                                <span className="pull-right text-muted small">4 phút trước</span>
                            </div>
                        </a>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <div className="text-center link-block">
                            <a href="/notifications">
                                <strong>Xem tất cả </strong>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </li>
                </ul>
            </li>
        )
    }

    render() {
        return (
            this.renderDropdownNotification()
        )
    }
}

export default FmsNotificationPopup;