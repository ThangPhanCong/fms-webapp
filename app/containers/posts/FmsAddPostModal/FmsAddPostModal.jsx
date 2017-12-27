import React from 'react';
import uuid from 'uuid';

import {Modal, DropdownButton, MenuItem} from 'react-bootstrap';
import ProjectApi from '../../../api/ProjectApi';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';

class FmsAddPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            selectedPage: null,
            isHandling: false
        }
    }
    onSelect(eventKey) {
        this.state.pages.forEach(page => {
           if (page._id === eventKey) this.setState({ selectedPage: page });
        });
    }
    componentWillMount() {
        this.setState({ isHandling: true });
        ProjectApi.getProject(this.props.alias)
            .then(res => {
                this.setState({ pages: res.pages, isHandling: false });
            }, () => {
                alert("Something went wrong.");
            });
    }
    renderMenuItem() {
        return this.state.pages.map(page => {
            return <MenuItem key={uuid()} eventKey={page._id}>{page.name}</MenuItem>
        });
    }
    renderBody() {
        if (this.state.isHandling === true) {
            return <div className="spin-wrapper"><FmsSpin size={27}/></div>
        } else {
            return <textarea className="textarea-new-post" placeholder="Nhập nội dung"/>;
        }
    }
    render() {
        let selectedPage = (this.state.selectedPage) ? this.state.selectedPage.name : "Chọn trang";
        if (selectedPage.length > 40) selectedPage = selectedPage.substr(0, 35) + "...";
        let isDisabled = (this.state.isHandling);
        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.closeModal();
                }}
                backdrop='static' keyboard={false}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        <div className="title-modal">Đăng bài mới cho trang </div>
                        <DropdownButton onSelect={(eventKey) => {this.onSelect(eventKey)}} title={selectedPage} id={uuid()}>
                            {this.renderMenuItem()}
                        </DropdownButton>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderBody()}
                </Modal.Body>
                <Modal.Footer>
                    <div className="trailer-new-post">
                        <button className="button-new-post btn btn-success" disabled={isDisabled}>Lên lịch</button>
                        <button className="button-new-post btn btn-primary" disabled={isDisabled}>Đăng</button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default FmsAddPostModal;