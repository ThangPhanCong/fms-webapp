import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import {createOrderTag} from "../../../api/OrderTagApi";

class FmsCreateOrderTagModal extends Component {

    state = {
        tag: {},
        isLoading: false
    };

    onCreateOrderTag() {
        const {tag} = this.state;
        const {project} = this.props;

        this.setState({isLoading: true});

        createOrderTag(project.alias, tag)
            .then(tag => {
                this.closeModal(true);
            })
            .catch(err => {
                alert(err.message);
            })
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

    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.isShown) {
    //         this.setState({tag: {}, isLoading: false});
    //     }
    // }

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
                        <h4 className='modal-title'>Thẻ mới</h4>

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
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateOrderTag.bind(this)}
                            disabled={isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateOrderTagModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateOrderTagModal;
