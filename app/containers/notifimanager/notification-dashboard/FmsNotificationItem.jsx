import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FmsNotificationItem extends Component {

    render() {
        const {
            noti,
            position
        } = this.props;

        return (
            <tr className="read">
                <td>
                    <i className="fa fa-bell" style={{color: "#18A68F"}}/>
                </td>

                <td>
                    <Link to={`/notifications/${noti._id}`}>
                        {noti.is_archived ?
                            <span className="label label-info">Đã lưu</span> :
                            <span className="label label-danger">Chưa lưu</span>}
                    </Link>
                </td>

                <td>

                    <Link to={`/notifications/${noti._id}`}>{noti.title}</Link>
                </td>

                <td>
                    <Link to={`/notifications/${noti._id}`}>
                        {noti.content}
                    </Link>
                </td>
            </tr>
        )
    }
}

export default FmsNotificationItem;