import React from 'react';
import {Modal} from "react-bootstrap";
import FmsCheckbox from "../../commons/checkbox/FmsCheckbox";

class FmsAddPageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
            getHistory: false
        }
    }

    handleDayChange() {
        let date = this.refs.since.value;
        this.setState({selectedDate: date});
    }

    onSelectOption() {
        this.setState({getHistory: !this.state.getHistory});
    }

    render() {
        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.onClose();
                }}
                backdrop='static' keyboard={false}>
                <div className="inmodal">
                    <Modal.Header closeButton={true}>
                        <Modal.Title>
                            <div className="modal-title">Thêm trang vào cửa hàng</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                            <FmsCheckbox className="add-page-checkbox" checked={this.state.getHistory}
                                         onChange={() => {
                                             this.onSelectOption()
                                         }}/>
                            Lấy lịch sử của trang
                        </label>
                        {this.state.getHistory ?
                            <div className="form-group date-picker-wrapper row">
                                <div className="col-sm-5"><div className="control-label instruction">Chọn ngày bắt đầu lấy lịch sử: </div></div>
                                <div className="col-sm-7"><input type="date"
                                       className="form-control"
                                       ref='since'
                                       value={this.state.selectedDate || ''}
                                       onChange={() => {this.handleDayChange()}}
                                /></div>
                            </div>
                            : null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default"
                                onClick={() => {
                                    this.props.onClose();
                                }}>
                            Hủy
                        </button>
                        <button className="btn btn-primary"
                                onClick={() => {
                                    this.props.onClose();
                                    this.props.addPage(this.state.getHistory, this.state.selectedDate);
                                }}
                                disabled={!(!this.state.getHistory || this.state.selectedDate)}>
                            Thêm
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

export default FmsAddPageModal;