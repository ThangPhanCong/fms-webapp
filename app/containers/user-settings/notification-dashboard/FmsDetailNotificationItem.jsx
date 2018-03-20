import React, {Component} from "react";
import * as notiApi from "../../../api/NotificationsApi";
import {AuthenService} from "../../../services/AuthenService";
import FmsSpin from "../../../commons/FmsSpin/FmsSpin";

class FmsDetailNotificationItem extends Component {
    state = {
        notiData: {},
        isLoading: false
    };

    componentWillMount() {
        this.getNotification();
    }

    async getNotification() {
        this.setState({
            isLoading: true
        });

        const userInfo = AuthenService.getUser();
        const {id} = this.props.match.params;

        try {
            const data = await notiApi.getNotification(userInfo._id, id, 'BASE');
            this.setState({
                notiData: data
            })
        } catch (err) {
            alert(err.message)
        }

        this.setState({
            isLoading: false
        })
    }

    async onUpdateArchived(is_archived) {
        const userInfo = AuthenService.getUser();
        const {id} = this.props.match.params;

        try {
            const archivedNoti = await notiApi.updateArchived(is_archived, userInfo._id, id, 'BASE');
            this.setState({
                notiData: archivedNoti
            });
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        const {
            notiData,
            isLoading
        } = this.state;

        if (isLoading) {
            return (
                <div style={{textAlign: 'center'}}>
                    <FmsSpin size={25}/>
                </div>
            )
        }

        return (
            <div>
                {!notiData.is_archived ?
                    <button className="btn btn-outline btn-sm btn-white button-archive"
                            onClick={() => this.onUpdateArchived(true)}
                    >Lưu trữ</button> : null
                }

                <h3>{notiData.title}</h3>

                <p>{notiData.content}</p>
            </div>
        )
    }
}

export default FmsDetailNotificationItem;