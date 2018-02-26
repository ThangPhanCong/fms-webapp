import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FmsNotificationItem extends Component {

    render() {
        const {
            noti
        } = this.props;
        return (
            <tr className="read">
                <td>
                    {noti.is_archived ?
                        <i className="fa fa-star" style={{fontSize: "14px", paddingRight: "7px", color: "yellow"}}/> :
                        <i className="fa fa-star-o" style={{fontSize: "14px", paddingRight: "7px"}}/>}

                    <Link to={`/notifications/${noti._id}`}>{noti.title}</Link>
                </td>

                <td>
                    <Link to={`/notifications/${noti._id}`}>
                        {noti.content}
                    </Link>
                </td>
                <td>
                    <Link to={`/notifications/${noti._id}`}>
                        21:35
                    </Link>
                </td>
            </tr>
        )
    }
}

export default FmsNotificationItem;