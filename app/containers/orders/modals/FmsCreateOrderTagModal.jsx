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

    onChangeColor(color) {
        let tag = this.state.tag;
        tag.color = color;
        this.setState({tag: tag});
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
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            tag
        } = this.state;

        let name = tag.name;
        name = (name) ? name : "";
        let color = (tag.color) ? tag.color : '#CACACA';
        let style = {backgroundColor: color, color: "white"};

        let isDisabled = color === '#CACACA' || name === "" || isLoading;
        let calcelIsDisabled = this.props.isEditting;
        let preview = (name === "") ? " hide" : "";

        return (
            <Modal show={isShown} backdrop='static' keyboard={false}>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Tạo thẻ màu mới</h4>

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
                                <label className="control-label">Tên thẻ</label>
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
                                       ref='description'
                                       value={tag.description || ''}
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
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={calcelIsDisabled}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateOrderTag.bind(this)}
                            disabled={isDisabled}>Tạo mới
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
