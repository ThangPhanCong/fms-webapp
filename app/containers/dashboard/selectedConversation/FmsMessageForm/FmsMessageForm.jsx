import React from 'react';
import {connect} from 'react-redux';

import attachImg from '../../../../assets/images/attachment.png';
import sendImg from '../../../../assets/images/send.png';
import menuImg from '../../../../assets/images/ic_menu.png';

import {handleFileChange, handleFormSubmit} from '../../../../actions/dashboard/chat/messageForm';
import SampleApi from '../../../../api/SampleMessageApi';
import {noti} from "../../../notification/NotificationService";

class FmsMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownDropdown: false,
            samples: []
        }
    }

    componentDidMount() {
        SampleApi.getSampleMessages()
            .then(res => {
                this.setState({samples: res});
            }, err => {
                console.log(err);
            });
        setTimeout(() => {
            this.refs.message.focus();
        }, 500);
    }

    handleFileChange(e) {
        this.props.dispatch(handleFileChange(e));
    }

    handleFormSubmit(e) {
        this.props.dispatch(handleFormSubmit(e, this.refs.message));
    }

    openDropdown() {
        let state = this.state.isShownDropdown;
        this.setState({isShownDropdown: !state});
        setTimeout(() => {
            this.refs.sample.focus();
        }, 200);
    }

    copySampleMessage(message) {
        this.refs.message.value = message;
        this.setState({isShownDropdown: false});
        this.refs.message.focus();
    }

    saveSample(e) {
        e.preventDefault();
        let text = this.refs.sample.value;
        if (!text) return;
        SampleApi.addSampleMessage(text)
            .then(res => {
                let newSamples = this.state.samples;
                newSamples.push(res);
                this.setState({samples: newSamples});
            }, err => {
                console.log(err);
            });
        this.refs.sample.value = "";
    }

    deleteSample(sample_id) {
        SampleApi.deleteSampleMessage(sample_id)
            .then(() => {
                noti("success", "Đã xóa một tin nhắn mẫu");
                let newSamples = this.state.samples.filter(s => s._id !== sample_id);
                this.setState({samples: newSamples});
            }, err => {
                alert(err);
            });
    }

    renderSampleMessages() {
        if (!this.state.samples) return;
        return this.state.samples.map(sample => {
            return <li className="sample" key={sample._id}>
                <span className="clickable" onClick={() => {
                    this.copySampleMessage(sample.message)
                }}>{sample.message}</span>
                <i className="glyphicon glyphicon-remove clickable" onClick={() => {
                    this.deleteSample(sample._id)
                }}/>
            </li>;
        });
    }

    render() {
        let dropdown = this.state.isShownDropdown ? "" : " hide";
        return (
            <div className="message-form">
                <ul className={"dropdown-menu" + dropdown}>
                    <form onSubmit={this.saveSample.bind(this)} className="sample-form">
                        <input ref="sample" placeholder="Nhập tin nhắn mẫu rồi nhấn Enter để lưu"/>
                    </form>
                    <div className="sample-list">
                        {this.renderSampleMessages()}
                    </div>
                </ul>
                <form onSubmit={this.handleFormSubmit.bind(this)} className="input-wrapper">
                    <img src={menuImg} className="sample-response clickable" onClick={this.openDropdown.bind(this)}/>
                    <input className="input-text" ref="message" placeholder="Soạn tin nhắn..."/>
                    <ul className="group-button">
                        {this.props.conversation.type === 'comment' ?
                            <li><a href="#">
                                <img src={attachImg} className="attach-button"/>
                                <input type="file" className="input-file" accept="image/*"
                                       onChange={this.handleFileChange.bind(this)}/>
                            </a></li>
                            : null
                        }
                        <li><img src={sendImg} className="send-button" onClick={this.handleFormSubmit.bind(this)}/></li>
                    </ul>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.dashboard.chat.conversation
    }
};

export default connect(mapStateToProps)(FmsMessageForm);
