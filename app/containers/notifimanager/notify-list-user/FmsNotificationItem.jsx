import React, {Component} from 'react';
import FmsCheckbox from "../../../commons/checkbox/FmsCheckbox";

class FmsNotificationItem extends Component {

    render() {
        const {
            title,
            content,
            id,
            is_checked,
            onSelectNotification
        } = this.props

        return (
            <tr className="read" key={id}>
                <td className="check-mail">
                    <FmsCheckbox checked={is_checked} onChange={onSelectNotification}/>
                </td>
                <td>
                    <a href="#">{title}</a>
                </td>
                <td>
                    <a href="#">
                        <span>{content}</span>
                    </a>
                </td>
                <td>
                    <i className="fa fa-paperclip"></i>
                </td>
                <td className="text-right mail-date">6.10 AM</td>
            </tr>
        )
    }
}

export default FmsNotificationItem;