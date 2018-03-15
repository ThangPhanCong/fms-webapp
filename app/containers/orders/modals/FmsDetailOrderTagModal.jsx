import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {deleteOrderTag, updateOrderTag} from "../../../api/OrderTagApi";

class FmsDetailOrderTagModal extends Component {

    state = {
        tag: {},
        isLoading: false
    };

    onUpdateOrderTag() {
        const {project, tag} = this.props;

        this.setState({isLoading: true});
        const newTag = {
            _id: tag._id,
            name: this.state.tag.name || tag.name,
            color: this.state.tag.color || tag.color,
            description: this.state.tag.description || tag.description
        };

        updateOrderTag(project.alias, newTag)
            .then(() => {
                this.closeModal(true);
            })
            .catch(err => {
                alert(err.message);
            })
    }

    onDeleteButtonClick() {
        const allowDelete = confirm('Bạn có chắc chắn muốn xóa thẻ màu?');

        if (allowDelete) {
            const {tag} = this.state;
            const {project} = this.props;

            this.setState({isLoading: true});

            deleteOrderTag(project.alias, tag._id)
                .then(() => {
                    this.closeModal(true);
                })
                .catch(err => {
                    alert(err.message);
                })
        }
    }

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.setState({tag: {}, isLoading: false});
        this.props.onClose(shouldUpdate);
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const newTag = {...this.state.tag};
        newTag[refName] = newValue;

        this.setState({tag: newTag});
    }

    onChangeColor(color) {
        let tag = this.state.tag;
        tag.color = color;
        this.setState({tag: tag});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.setState({isLoading: false});
        }

        if (nextProps.tag) {
            this.setState({tag: {...nextProps.tag}});
        }
    }

    renderColors() {
        return this.props.colors.map((color, index) => {
            return <div key={index} className="color-card" style={{backgroundColor: color}}
                        onClick={() => {
                            this.onChangeColor(color)
                        }}/>;
        });
    }

    render() {
        const {isShown} = this.props;
        const selectedTag = this.props.tag;
        const {isLoading, tag} = this.state;

        let name = tag.name;
        name = (name || name === "") ? name : (selectedTag ? selectedTag.name : "");
        let note = (tag.description || tag.description === "") ? tag.description :
                   (selectedTag && selectedTag.description ? selectedTag.description : "");
        let color = (tag.color) ? tag.color : (selectedTag ? selectedTag.color : "#CACACA");
        let style = {backgroundColor: color, color: "white"};

        let isDisabled = name === "" || isLoading;
        let calcelIsDisabled = isLoading;
        let preview = (name === "") ? " hide" : "";

        return (
            <Modal show={isShown} backdrop='static' keyboard={false}>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Chỉnh sửa thẻ màu</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Chọn màu</label>
                            </div>
                            <div className="col-sm-9">
                                {this.renderColors()}
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Tên</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='name'
                                       value={name || ''}
                                       onChange={() => {
                                           this.onChangeInput('name')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Ghi chú</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='description'
                                       value={note}
                                       onChange={() => {
                                           this.onChangeInput('description')
                                       }}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label form-group-label">Xem trước</label>
                            </div>
                            <div className="col-sm-9">
                                <div className={"preview" + preview} style={style}>{name}</div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-danger btn-outline pull-left'
                            onClick={this.onDeleteButtonClick.bind(this)}
                            disabled={calcelIsDisabled}>Xóa
                        </button>

                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={calcelIsDisabled}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateOrderTag.bind(this)}
                            disabled={isDisabled}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsDetailOrderTagModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsDetailOrderTagModal;
