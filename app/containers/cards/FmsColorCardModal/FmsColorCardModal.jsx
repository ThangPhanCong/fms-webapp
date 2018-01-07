import React from 'react';
import Modal from "react-bootstrap/es/Modal";
import {addNewTag, deleteTag, updateTag} from "../../../actions/setting/setting-tag";
import {TAG_COLORS} from "../../../constants/tag";
import {connect} from "react-redux";

class FmsColorCardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            color: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data && nextProps.data) {
            this.setState({name: nextProps.data.name, color: nextProps.data.color});
        }
    }

    onChangeInput(refName) {
        let value = this.refs[refName].value;
        this.setState({name: value});
    }

    onChangeColor(color) {
        this.setState({color: color});
    }

    updateTag() {
        const {dispatch, alias, data} = this.props;
        let tag = {
            _id: data._id,
            name: this.state.name || data.name,
            color: this.state.color || data.color
        };
        dispatch(updateTag(alias, tag, this.props.closeModal));
    }

    deleteTag() {
        const {dispatch, alias, data} = this.props;
        dispatch(deleteTag(alias, data, this.props.closeModal));
    }

    addNewTag() {
        const {dispatch, alias} = this.props;
        dispatch(addNewTag(alias, this.state.color, this.state.name, this.props.closeModal));
    }

    renderColors() {
        return TAG_COLORS.map((color, index) => {
            let same = this.props.tags.filter(tag => {
               return tag.color === color;
            });
            if (same.length === 0) {
                return <div key={index} className="color-card" style={{backgroundColor: color}}
                            onClick={() => {this.onChangeColor(color)}}/>;
            }
        });
    }

    render() {
        let data = this.props.data;
        let title = (data) ? "Cập nhật thẻ màu" : "Tạo thẻ màu mới";
        let name = this.state.name;
        name = (name || (name !== null && name === "")) ? name : (data ? data.name : "Thẻ mới");
        let note = (data && data.description) ? data.description : "Thêm ghi chú của bạn";
        let color = (this.state.color) ? this.state.color : (data ? data.color : '#CACACA');
        let style = {backgroundColor: color, color: "white"};

        let isDisabled = color === '#CACACA' || name === "Thẻ mới" || this.props.isEditting;

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
                        <div className="form-group color-card-form-group">
                            <label className="form-group-label">Chọn màu</label>
                            {this.renderColors()}
                        </div>
                        <div className="form-group color-card-form-group">
                            <label className="control-label form-group-label">Tên thẻ</label>
                            <input type="text"
                                   className="form-control"
                                   ref='name'
                                   value={name}
                                   onChange={() => {this.onChangeInput('name')}}/>
                        </div>
                        <div className="form-group color-card-form-group">
                            <label className="control-label form-group-label">Ghi chú</label>
                            <input type="text"
                                   className="form-control"
                                   ref='note'
                                   defaultValue={note}/>
                        </div>
                        <div className="form-group color-card-form-group">
                            <label className="control-label form-group-label">Xem trước</label>
                            <div className="preview" style={style}>{name}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {data ? <button className="button-new-post btn btn-danger" disabled={isDisabled}
                                        onClick={this.deleteTag.bind(this)}>Xóa thẻ</button> : null}
                        {data ?
                            <button className="button-new-post btn btn-success" onClick={this.updateTag.bind(this)} disabled={isDisabled}>Cập nhật</button> :
                            <button className="button-new-post btn btn-success" onClick={this.addNewTag.bind(this)} disabled={isDisabled}>Tạo mới</button>}
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        tags: state.setting.settingTag.tags,
        isEditting: state.setting.setting.isEditting
    }
};

export default connect(mapStateToProps)(FmsColorCardModal);