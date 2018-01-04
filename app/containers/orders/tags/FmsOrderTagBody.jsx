import React, {Component} from "react";
import {deleteOrderTag, getOrderTags} from "../../../api/OrderTagApi";
import FmsSpin from "commons/FmsSpin/FmsSpin";
import FmsCreateOrderTagModal from "../modals/FmsCreateOrderTagModal";
import FmsDetailOrderTagModal from "../modals/FmsDetailOrderTagModal";

class FmsOrderTagBody extends Component {

    state = {
        tags: [],
        selectedTag: null,
        isShownCreateTagModal: false,
        isShownDetailTagModal: false,
        isLoading: true,
        project: null
    };

    onCloseCreateTagModal(shouldUpdateTags) {
        if (shouldUpdateTags) {
            const {project} = this.state;
            this.updateTags(project);
        }

        this.setState({isShownCreateTagModal: false})
    }

    onOpenCreateTagModal() {
        this.setState({isShownCreateTagModal: true})
    }

    onCloseDetailTagModal(shouldUpdate) {
        if (shouldUpdate) {
            const {project} = this.state;
            this.updateTags(project);
        }

        this.setState({isShownDetailTagModal: false});
    }

    onOpenDetailTagModal(tag) {
        this.setState({
            selectedTag: tag,
            isShownDetailTagModal: true
        });
    }

    updateTags(project) {
        this.setState({isLoading: true});

        getOrderTags(project.alias)
            .then((tags = []) => {
                this.setState({tags, isLoading: false});
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false});
            })
    }

    onDeleteTag(tag) {
        const {project} = this.state;
        const allowDelete = confirm('Bạn có chắc chắn muốn xóa thẻ màu?');
        if (allowDelete) {
            deleteOrderTag(project.alias, tag._id)
                .then(() => {
                    this.updateTags(project);
                })
                .catch(err => {
                    alert(err.message);
                })
        }
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
                    <td>
                        <i className="fa fa-trash-o clickable"
                            onClick={() => this.onDeleteTag(tag)}
                        />
                    </td>
                    <td>
                        <i className="fa fa-pencil clickable"
                           onClick={() => this.onOpenDetailTagModal({...tag})}
                        />
                    </td>
                </tr>
            )
        )
    }

    renderTagTable() {
        const {isLoading, tags} = this.state;

        return (
            <div className="table-responsive">
                {
                    isLoading ?
                        <FmsSpin size={25} center/>
                        : (
                            (tags.length !== 0) ?
                                (
                                    <table className="table table-striped order-tag-table">
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
                                )
                                : null
                        )
                }
            </div>
        )
    }

    render() {
        const {
            isShownCreateTagModal,
            isShownDetailTagModal,
            project,
            selectedTag
        } = this.state;

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
                                            onClick={this.onOpenCreateTagModal.bind(this)}
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
                        onClose={this.onCloseCreateTagModal.bind(this)}
                        project={project}
                    />

                    <FmsDetailOrderTagModal
                        isShown={isShownDetailTagModal}
                        onClose={this.onCloseDetailTagModal.bind(this)}
                        project={project}
                        tag={selectedTag}
                    />
                </div>
            </div>
        )
    }

}


export default FmsOrderTagBody;