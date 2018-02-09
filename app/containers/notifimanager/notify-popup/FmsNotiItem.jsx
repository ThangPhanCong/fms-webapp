import React, {Component} from 'react';
import truncateString from "../../../utils/truncate-string";
import capitalize from "../../../utils/capitalize-string";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class FmsNotiItem extends Component {

    render() {
        const {
            noti,
            onShowArchived,
            selectedArchive,
            onArchiveNotification,
            position
        } = this.props;

        const tooltip = (
            <Tooltip id="tooltip">
                {
                    noti.is_archived ?
                        null :
                        <span>Ẩn thông báo này</span>
                }
            </Tooltip>
        );

        return (
            <li key={position} className="list-noti"
            >
                <a>
                    <div
                        onMouseEnter={onShowArchived}>
                        <i className="fa fa-user-circle-o"
                           aria-hidden="true"></i>
                        <span style={{paddingLeft: '5px'}}>{truncateString(capitalize(noti.title), 20)}</span>
                        <span style={{paddingLeft: '5px', position: 'relative'}}>
                            {/*<span className="item-content">  {truncateString(noti.content, 15)}</span>*/}
                            <span className="pull-right text-muted small">4 phút trước</span>
                        <span>
                                 {
                                     position == selectedArchive ?
                                         <OverlayTrigger placement="top" overlay={tooltip}>
                                             <i className={
                                                 `fa ${noti.is_archived ? 'fa-circle-o' : 'fa-circle'}
                                                  pick-archive`
                                             }
                                                onClick={onArchiveNotification}>
                                             </i>
                                         </OverlayTrigger>
                                         : null
                                 }
                            </span>
                        </span>
                    </div>
                </a>
                <li className="divider"></li>
            </li>
        )
    }
}

export default FmsNotiItem;