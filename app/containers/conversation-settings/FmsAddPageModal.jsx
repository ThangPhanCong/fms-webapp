import React from 'react';
import {Modal} from "react-bootstrap";
import FmsCheckbox from "../../commons/checkbox/FmsCheckbox";

class FmsAddPageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
            options: [false, false, false]
        }
    }

    handleDayChange() {
        let date = this.refs.since.value;
        this.setState({selectedDate: date});
    }

    onSelectOption(option) {
        let newOptions = this.state.options;
        for (let i = 0; i < newOptions.length; i++) {
            if (i === option) newOptions[i] = !newOptions[i];
            else newOptions[i] = false;
        }
        this.setState({options: newOptions});
    }

    addPage() {
        let isValid = false, getHistory = false, selectedDate = this.state.selectedDate;
        if (this.state.options[0]) {
            getHistory = true;
            isValid = true;
        }
        if (this.state.options[1]) {
            getHistory = true;
            selectedDate = this.state.selectedDate;
            isValid = !!selectedDate;
        }
        if (this.state.options[2]) {
            getHistory = false;
            isValid = true;
        }
        if (!isValid) alert("Vui lòng chọn đầy đủ thông tin");
        else {
            this.props.onClose();
            this.props.addPage(getHistory, selectedDate);
        }
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
                            <FmsCheckbox className="add-page-checkbox" checked={this.state.options[0]}
                                         onChange={() => {
                                             this.onSelectOption(0)
                                         }}/>
                            Lấy tất cả lịch sử của trang
                        </label>
                        <div className="row" style={{marginTop: "8px", marginBottom: "8px"}}>
                            <label className="col-sm-5" style={{marginTop: "3px"}}>
                                <FmsCheckbox className="add-page-checkbox" checked={this.state.options[1]}
                                             onChange={() => {
                                                 this.onSelectOption(1)
                                             }}/>
                                <div className="start-date">Lấy lịch sử bắt đầu từ ngày</div>
                            </label>
                            <div className="col-sm-7"><input type="date"
                                                             className="form-control"
                                                             ref='since'
                                                             value={this.state.selectedDate || ''}
                                                             onChange={() => {this.handleDayChange()}}
                            /></div>
                        </div>
                        <label>
                            <FmsCheckbox className="add-page-checkbox" checked={this.state.options[2]}
                                         onChange={() => {
                                             this.onSelectOption(2)
                                         }}/>
                            Không lấy lịch sử trang
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default"
                                onClick={() => {
                                    this.props.onClose();
                                }}>
                            Hủy
                        </button>
                        <button className="btn btn-primary"
                                onClick={this.addPage.bind(this)}
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