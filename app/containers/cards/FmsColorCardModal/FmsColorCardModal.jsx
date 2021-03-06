import React from 'react';
import Modal from "react-bootstrap/es/Modal";
import {TAG_COLORS} from "../../../constants/tag";

class FmsColorCardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            color: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data && nextProps.data) {
            this.setState({name: nextProps.data.name, color: nextProps.data.color, description: nextProps.data.description});
        } else if (this.props.data && !nextProps.data) {
            this.setState({name: null, color: null, description: null});
        }
    }

    onChangeInput(refName) {
        let value = this.refs[refName].value;
        if (refName === 'name') this.setState({name: value});
        else this.setState({description: value});
    }

    onChangeColor(color) {
        this.setState({color: color});
    }

    updateTag() {
        const {data} = this.props;
        let tag = {
            _id: data._id,
            name: this.state.name || data.name,
            color: this.state.color || data.color,
            description: this.state.description || data.description
        };
        this.setState({name: null, color: null, description: null});
        this.props.updateTag(tag);
    }

    deleteTag() {
        this.setState({name: null, color: null, description: null});
        this.props.deleteTag(this.props.data);
    }

    addNewTag() {
        this.props.addNewTag({name: this.state.name, color: this.state.color, description: this.state.description});
        this.setState({name: null, color: null, description: null});
    }

    renderColors() {
        return TAG_COLORS.map((color, index) => {
            let same = this.props.tags.filter(tag => {
                return tag.color === color;
            });
            if (same.length === 0) {
                return <div key={index} className="color-card" style={{backgroundColor: color}}
                            onClick={() => {
                                this.onChangeColor(color)
                            }}/>;
            }
        });
    }

    render() {
        let data = this.props.data;
        let title = (data) ? "Chỉnh sửa thẻ màu" : "Tạo thẻ màu mới";
        let name = this.state.name;
        name = (name || name === "") ? name : (data ? data.name : "");
        let note = this.state.description;
        note = (note || note === "") ? note : ((data && data.description) ? data.description : "");
        let color = (this.state.color) ? this.state.color : (data ? data.color : '#CACACA');
        let style = {backgroundColor: color, color: "white"};

        let isDisabled = color === '#CACACA' || name === "" || this.props.isEditting;
        let calcelIsDisabled = this.props.isEditting;
        let preview = (name === "") ? " hide" : "";

        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.closeModal();
                }}
                backdrop='static' keyboard={false}>
                <div className="inmodal">
                    <Modal.Header closeButton={!this.props.isEditting}>
                        <h4 className="fms-modal-title">{title}</h4>
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
                                       value={name}
                                       onChange={() => {
                                           this.onChangeInput('name')
                                       }}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Ghi chú</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='note'
                                       value={note}
                                       onChange={() => {
                                           this.onChangeInput('note')
                                       }}/>
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
                        {data ? <button className="btn btn-danger btn-outline pull-left" disabled={isDisabled}
                                        onClick={this.deleteTag.bind(this)}>Xóa</button> : null}
                        <button className="btn btn-default" disabled={calcelIsDisabled}
                                onClick={this.props.closeModal}>Hủy
                        </button>
                        {data ?
                            <button className="btn btn-primary" onClick={this.updateTag.bind(this)}
                                    disabled={isDisabled}>Cập nhật</button> :
                            <button className="btn btn-primary" onClick={this.addNewTag.bind(this)}
                                    disabled={isDisabled}>Tạo mới</button>}
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

export default FmsColorCardModal;