import React, {Component} from "react";
import {getOrderTags} from "../../../api/OrderTagApi";
import FmsSpin from "commons/FmsSpin/FmsSpin";
import FmsCreateOrderTagModal from "../modals/FmsCreateOrderTagModal";

class FmsOrderTagBody extends Component {

    state = {
        tags: [],
        isShownCreateTagModal: false,
        isLoading: true,
        project: null
    };

    onCloseModal(shouldUpdateTags) {
        if (shouldUpdateTags) {

        }

        this.setState({isShownCreateTagModal: false})
    }

    onOpenModal() {
        this.setState({isShownCreateTagModal: true})
    }

    updateTags(project) {
        this.setState({isLoading: true});

        getOrderTags(project.alias)
            .then(tags => {
                this.setState({tags, isLoading: false});
            })
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.state;

        if (!project || (nextProps.project && nextProps.project.alias !== project.alias)) {
            this.updateTags(nextProps.project);
            this.setState({project: nextProps.project});
        }
    }

    renderOrderTagItem() {
        const {tags} = this.state;

        return tags.map(
            (tag, i) => (
                <tr key={i}>
                    <td>{i}</td>
                    <td className="color-tag">
                        <a>
                            <span
                                className="label"
                                style={{backgroundColor: tag.color}}
                            >&nbsp;</span>
                        </a>
                    </td>
                    <td>{tag.name}</td>
                    <td>Đánh dấu những đơn cần liên hệ lại cho khách</td>
                    <td className="color-tag">
                        <span
                            className="label tag-label"
                            style={{
                                backgroundColor: tag.color,
                                color: 'white'
                            }}
                        >{tag.name}</span>
                    </td>
                    <td><i className="fa fa-trash-o clickable"/>
                    </td>
                    <td><i className="fa fa-pencil clickable"/>
                    </td>
                </tr>
            )
        )
    }

    renderTagTable() {
        const {isLoading} = this.state;

        return (
            <div className="table-responsive order-tag-table">
                {
                    isLoading ?
                        <FmsSpin size={25} center/>
                        :
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Màu</th>
                                <th>Tên thẻ</th>
                                <th>Ghi chú</th>
                                <th>Hiển thị</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.renderOrderTagItem()
                            }
                            </tbody>
                        </table>
                }
            </div>
        )
    }

    render() {
        const {isShownCreateTagModal, project} = this.state;

        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-content">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={this.onOpenModal.bind(this)}
                                        >
                                            <i className="fa fa-plus"/> Thêm thẻ màu
                                        </button>
                                    </div>
                                </div>

                                {
                                    this.renderTagTable()
                                }

                            </div>
                        </div>
                    </div>

                    <FmsCreateOrderTagModal
                        isShown={isShownCreateTagModal}
                        onClose={this.onCloseModal.bind(this)}
                        project={project}
                    />
                </div>
            </div>
        )
    }

}


export default FmsOrderTagBody;