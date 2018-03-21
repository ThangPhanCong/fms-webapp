import React, {Component} from 'react';
import truncateString from "../../../utils/truncate-string";
import capitalize from "../../../utils/capitalize-string";
import {Link} from "react-router-dom";

class FmsNotiItem extends Component {

    render() {
        const {
            noti,
            onShowArchived,
            position
        } = this.props;

        return (
            <li key={position} className="list-noti">
                <Link
                    to={`/settings/notifications/${noti._id}`}
                    replace
                >
                    <div
                        onMouseEnter={onShowArchived}
                    >
                        <i className="fa fa-user-circle-o" aria-hidden="true"/>
                        <span style={{paddingLeft: '5px'}}>{truncateString(capitalize(noti.title), 25)}</span>
                        <span style={{paddingLeft: '5px', position: 'relative'}}>
                            <span className="pull-right text-muted small">4 phút trước</span>
                        </span>
                    </div>
                </Link>
                <p className="divider"/>
            </li>
        )
    }
}

export default FmsNotiItem;