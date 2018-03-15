import React from 'react';
import inboxImg from '../../../../assets/images/inbox.png';
import postImg from '../../../../assets/images/post.png';
import FmsDate from '../../../../helpers/FmsDate';
import utils from '../../../../helpers/utils';

class FmsConversationItem extends React.Component {

    static convertTime(time) {
        let date = new FmsDate(time);
        return date.getTimeConversationItem();
    }

    handleConversationClick() {
        const {onSelect, data} = this.props;
        onSelect(data);
    }

    renderIconType() {
        return this.props.data.tags.map((t, i) => {
            let tagStyled = {
                backgroundColor: t.color,
            };
            return <span className="client-item-tag" key={i} style={tagStyled}/>
        });
    }

    render() {
        let data = this.props.data;
        let message;
        let isSelected = (this.props.isSelected) ? " selectedItem" : "";
        let tags = (data.tags.length === 0) ? " hide" : "";

        let clientid = utils.parseCustomer(data, "fb_id");
        let clientName = utils.parseCustomer(data, "name");
        
        message = (data.snippet === "") ? "[Attachment]" : data.snippet;

        let seenClass = data.is_seen ? '' : ' not-seen';

        let avaUrl = `https://graph.facebook.com/v2.10/${clientid}/picture`;

        return (
            <div className={"client-item" + isSelected} onClick={this.handleConversationClick.bind(this)}>
                <div className="client-profile-wrapper">
                    <img src={avaUrl} className="client-profile"/>
                </div>
                <div className="name-and-message">
                    <div className="name-and-time">
                        <div className={"client-name " + seenClass}>{clientName}</div>
                        <div className={"updated-time" + seenClass}>{FmsConversationItem.convertTime(data.updated_time)}</div>
                    </div>
                    <div className="message-and-type">
                        <div className={"lastest-message" + seenClass}>{message}</div>
                        <img className="icon-type" src={data.type === 'inbox' ? inboxImg : postImg}/>
                    </div>
                    <div className={"client-item-tags" + tags}>
                        {this.renderIconType()}
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsConversationItem;
