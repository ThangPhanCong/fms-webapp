import React from 'react';
import {Modal} from "react-bootstrap";

class FmsAddPageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
            options: [false, false, false, false, false, false]
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
        let today = new Date();
        if (this.state.options[0]) {
            getHistory = false;
            selectedDate = null;
            isValid = true;
        }
        if (this.state.options[1]) {
            getHistory = true;
            selectedDate = today.setDate(today.getDate() - 7);
            isValid = true;
        }
        if (this.state.options[2]) {
            getHistory = true;
            selectedDate = today.setDate(today.getDate() - 30);
            isValid = true;
        }
        if (this.state.options[3]) {
            getHistory = true;
            selectedDate = today.setDate(today.getDate() - 183);
            isValid = true;
        }
        if (this.state.options[4]) {
            getHistory = true;
            selectedDate = today.setDate(today.getDate() - 365);
            isValid = true;
        }
        if (this.state.options[5]) {
            getHistory = true;
            isValid = !!selectedDate;
            if (isValid) selectedDate = (new Date(selectedDate)).getTime();
        }
        if (!isValid) alert("Vui lòng chọn đầy đủ thông tin");
        else {
            this.props.onClose();
            this.props.addPage(getHistory, selectedDate / 1000);
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
                        <label className="get-history-option">
                            <input type="radio" className="add-page-checkbox" checked={this.state.options[0]}
                                         onChange={() => {
                                             this.onSelectOption(0)
                                         }}/>
                            Không lấy dữ liệu cũ
                        </label>
                        <label className="get-history-option">
                            <input type="radio" className="add-page-checkbox" checked={this.state.options[1]}
                                         onChange={() => {
                                             this.onSelectOption(1)
                                         }}/>
                            Lấy dữ liệu của 1 tuần gần nhất
                        </label>
                        <label className="get-history-option">
                            <input type="radio" className="add-page-checkbox" checked={this.state.options[2]}
                                         onChange={() => {
                                             this.onSelectOption(2)
                                         }}/>
                            Lấy dữ liệu của 1 tháng gần nhất
                        </label>
                        <label className="get-history-option">
                            <input type="radio" className="add-page-checkbox" checked={this.state.options[3]}
                                         onChange={() => {
                                             this.onSelectOption(3)
                                         }}/>
                            Lấy dữ liệu của 6 tháng gần nhất
                        </label>
                        <label className="get-history-option">
                            <input type="radio" className="add-page-checkbox" checked={this.state.options[4]}
                                         onChange={() => {
                                             this.onSelectOption(4)
                                         }}/>
                            Lấy dữ liệu của 1 năm gần nhất
                        </label>
                        <div className="row" style={{marginTop: "8px", marginBottom: "8px"}}>
                            <label className="col-sm-5" style={{marginTop: "3px"}}>
                                <input type="radio" className="add-page-checkbox" checked={this.state.options[5]}
                                             onChange={() => {
                                                 this.onSelectOption(5)
                                             }}/>
                                <div className="start-date" style={{fontWeight: 500}}>Lấy dữ liệu tùy chọn</div>
                            </label>
                            <div className="col-sm-7 custom-date-picker">
                                <span>Ngày bắt đầu: </span>
                                <input type="date"
                                       className="form-control"
                                       ref='since'
                                       placeholder="Ngày bắt đầu"
                                       value={this.state.selectedDate || ''}
                                       onChange={() => {
                                           this.handleDayChange()
                                       }}
                                       disabled={!this.state.options[5]}
                                /></div>
                        </div>
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