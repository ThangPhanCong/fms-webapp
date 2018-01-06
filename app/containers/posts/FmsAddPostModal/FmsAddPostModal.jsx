import React from 'react';
import uuid from 'uuid';

import {Modal, DropdownButton, MenuItem} from 'react-bootstrap';
import ProjectApi from '../../../api/ProjectApi';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import fileApi from '../../../api/FileApi';
import FmsCroppedImage from '../../../commons/FmsCroppedImage/FmsCroppedImage';

class FmsAddPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unselectedPages: [],
            selectedPages: [],
            isHandling: false,
            files: [],
            states: []
        }
    }

    onSelect(eventKey) {
        let selectedPages = this.state.selectedPages;
        let unselectedPages = this.state.unselectedPages.filter(page => {
            if (page._id === eventKey) {
                selectedPages.push(page);
                return false;
            } else {
                return true;
            }
        });
        this.setState({selectedPages: selectedPages, unselectedPages: unselectedPages});
    }

    onDeleteSelectedPage(_id) {
        let unselectedPages = this.state.unselectedPages;
        let selectedPages = this.state.selectedPages.filter(page => {
            if (page._id === _id) {
                unselectedPages.push(page);
                return false;
            } else {
                return true;
            }
        });
        this.setState({selectedPages: selectedPages});
    }

    onChangeAlias() {
        if (!this.props.alias) return;
        this.setState({isHandling: true});
        ProjectApi.getProject(this.props.alias)
            .then(res => {
                this.setState({unselectedPages: res.pages, isHandling: false});
            }, () => {
                alert("Something went wrong.");
            });
    }

    onChangeFiles(e) {
        let self = this;
        let newFiles = this.state.files;
        let newStates = this.state.states;
        let files = e.target.files || e.dataTransfer.files;
        if (!files) return;
        files = Array.prototype.slice.call(files);
        files.forEach(file => {
            newStates.push("uploading");
            newFiles.push(file);
            let s3Url;
            fileApi.getS3SigningRequest(file.name, file.type)
                .then(data => {
                    let signedRequest = data.signedRequest;
                    s3Url = data.url;
                    return fileApi.uploadFileToS3(file, signedRequest);
                })
                .then(() => {
                    let reader = new FileReader();
                    reader.onload = function() {
                        let newStates = self.state.states.map((state, index) => {
                            let temp = self.state.files[index];
                            if (file.name === temp.name && file.lastModified === temp.lastModified) return reader.result;
                            else return state;
                        });
                        self.setState({states: newStates});
                    };
                    reader.readAsDataURL(file);
                })
                .catch(err => {console.log(err.message)});
        });
        this.setState({files: newFiles, states: newStates});
    }

    componentWillMount() {
        this.onChangeAlias();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.alias !== this.props.alias) {
            this.onChangeAlias();
        }
    }

    renderDropdownItem() {
        return this.state.unselectedPages.map(page => {
            return <MenuItem key={uuid()} eventKey={page._id}>{page.name}</MenuItem>
        });
    }

    renderImages() {
        if (this.state.states.length === 0) return <div>Chưa có ảnh nào.</div>;
        return this.state.states.map((state, index) => {
            if (state === "uploading") {
                return <div key={index} className="image-wrapper border">
                    <div className="spin-wrapper"><FmsSpin size={24}/></div>
                </div>
            } else {
                return <div key={index} className="image-wrapper">
                    <FmsCroppedImage src={state} className="image"/>
                </div>
            }
        });
    }

    renderBody() {
        if (this.state.isHandling === true) {
            return <div className="spin-wrapper"><FmsSpin size={27}/></div>
        } else {
            return <div>
                <textarea className="textarea-new-post" placeholder="Nhập nội dung"/>
                <div className="add-post-add-images">
                    <a>Thêm ảnh</a>
                    <input type="file" className="input-file" accept="image/*" multiple="multiple"
                           onChange={this.onChangeFiles.bind(this)}/>
                </div>
                <div className="add-post-image-wrapper">
                    {this.renderImages()}
                </div>
            </div>
        }
    }

    renderSelectedPages() {
        return this.state.selectedPages.map((page, index) => {
            return <div className="add-post-page-item" key={index}>
                {page.name}
                <span className="glyphicon glyphicon-remove delete-selected-page"
                      onClick={() => {this.onDeleteSelectedPage(page._id)}}/>
            </div>
        });
    }

    render() {
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
                        <div className="title-modal">Đăng bài mới cho các trang</div>
                        <DropdownButton onSelect={(eventKey) => {
                            this.onSelect(eventKey)
                        }} title={"Chọn trang"} id={uuid()}>
                            {this.renderDropdownItem()}
                        </DropdownButton>
                        <div>{this.renderSelectedPages()}</div>
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