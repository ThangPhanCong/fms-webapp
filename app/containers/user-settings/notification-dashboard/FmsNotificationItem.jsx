import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FmsNotificationItem extends Component {

    render() {
        const {
            noti,
            link
        } = this.props;

        return (
            <tr className="read">
                <td>
                    <i className="fa fa-bell"/>
                </td>

                <td>
                    <Link to={link}>{noti.title}</Link>
                </td>
            </tr>
        )
    }
}

export default FmsNotificationItem;