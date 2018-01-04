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
        const {tag} = this.state;
        const {project} = this.props;

        this.setState({isLoading: true});

        updateOrderTag(project.alias, tag)
            .then((tag) => {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShown) {
            this.setState({isLoading: false});
        }

        if (nextProps.tag) {
            this.setState({tag: {...nextProps.tag}});
        }
    }

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            tag
        } = this.state;

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
                                <label className="control-label">Tên</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='name'
                                       value={tag.name || ''}
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
                                       ref='price'
                                       value={tag.price || ''}
                                       onChange={() => {
                                           this.onChangeInput('price')
                                       }}
                                />
                            </div>
                        </div>


                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-danger btn-outline pull-left'
                            onClick={this.onDeleteButtonClick.bind(this)}
                            disabled={isLoading}>Xóa
                        </button>

                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onUpdateOrderTag.bind(this)}
                            disabled={isLoading}>Cập nhật
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
