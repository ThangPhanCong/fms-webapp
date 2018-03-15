import React from 'react';
import ReactDOM from 'react-dom';

import {Modal} from 'react-bootstrap';
import ProjectApi from '../../../api/ProjectApi';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import fileApi from '../../../api/FileApi';
import postsApi from '../../../api/PostsApi';
import FmsCroppedImage from '../../../commons/FmsCroppedImage/FmsCroppedImage';
import {noti} from "../../notification/NotificationService";
import FmsCheckbox from "../../../commons/checkbox/FmsCheckbox";
import uuid from 'uuid';

const MAX_FILE_SIZE = 2202010;
const MAX_NUMBER_OF_FILE = 15;

class FmsAddPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            isHandling: false,
            files: [],
            states: [],
            isPosting: false
        }
    }

    isNoSelectedPages() {
        let pages = this.state.pages.filter(p => p.isSelected);
        return pages.length === 0;
    }

    isUploadingFiles() {
        let filesHasNoUrl = this.state.states.filter(state => state === "uploading");
        return filesHasNoUrl.length > 0;
    }

    onChangeAlias() {
        if (!this.props.project) return;
        this.setState({isHandling: true});
        ProjectApi.getPages()
            .then(pages => {
                pages.forEach(p => {
                    p.isSelected = false
                });
                this.setState({pages: pages, isHandling: false});
            }, () => {
                alert("Something went wrong.");
            });
    }

    onSelectPage(page) {
        let pages = this.state.pages;
        pages.forEach(p => {
            if (p.fb_id === page.fb_id) p.isSelected = !p.isSelected;
        });
        this.setState({pages});
    }

    onChangeFiles(e) {
        let self = this;
        let newFiles = this.state.files;
        let newStates = this.state.states;

        let files = e.target.files || e.dataTransfer.files;
        if (!files) return;
        files = Array.prototype.slice.call(files);

        let isValid = true;
        files = files.filter(f => {
            if (f.size < MAX_FILE_SIZE) return true;
            else {
                isValid = false;
                return false;
            }
        });
        if (!isValid) alert("Kích thước ảnh tối đa là 2Mb. Một số ảnh quá lớn đã bị bỏ qua.");
        isValid = true;

        files.forEach((file) => {
            if (newFiles.length >= MAX_NUMBER_OF_FILE) {
                isValid = false;
                return;
            }
            newStates.push("uploading");
            newFiles.push(file);
            fileApi.getS3SigningRequest(uuid().replace(/\D/g,''), file.type)
                .then(data => {
                    let signedRequest = data.signedRequest;
                    let newFiles = this.state.files;
                    newFiles.forEach(f => {
                        if (f.name === file.name && f.lastModified === file.lastModified) {
                            f.url = data.url;
                        }
                    });
                    this.setState({files: newFiles});
                    return fileApi.uploadFileToS3(file, signedRequest);
                })
                .then(() => {
                    let reader = new FileReader();
                    reader.onload = function () {
                        let newStates = self.state.states.map((state, index) => {
                            let temp = self.state.files[index];
                            if (file.name === temp.name && file.lastModified === temp.lastModified) return reader.result;
                            else return state;
                        });
                        self.setState({states: newStates});
                    };
                    reader.readAsDataURL(file);
                })
                .catch(err => {
                    console.log(err.message)
                });
        });
        if (!isValid) alert("Số lượng ảnh tối đa là 15. Một số ảnh đã bị bỏ qua.");
        this.setState({files: newFiles, states: newStates});
    }

    onPost() {
        let message = this.refs.content.value;
        if (!message) {
            alert("Chưa có nội dung bài đăng.");
            return;
        }
        let pages = this.state.pages.filter(p => p.isSelected);
        let pages_fb_id = pages.map(p => p.fb_id);
        let images = this.state.files.map(f => f.url);
        let content = {message, urls: images, published: true};
        this.setState({isPosting: true});
        postsApi.addNewPost(pages_fb_id, content)
            .then(() => {
                this.props.closeModal();
                this.setState({isPosting: false, files: [], states: []});
                noti("success", `Đăng thành công bài viết cho ${pages_fb_id.length} trang.`);
            })
            .catch(() => {
                this.setState({isPosting: false});
                alert("Something went wrong");
            });
    }

    adjustHeight() {
        let textarea = ReactDOM.findDOMNode(this.refs.content);
        $(textarea).height(this.refs.content.scrollHeight - 4);
    }

    componentWillMount() {
        this.onChangeAlias();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.project !== this.props.project) {
            this.onChangeAlias();
        }
    }

    renderImages() {
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
                <textarea className="textarea-new-post" placeholder="Nhập nội dung"
                          ref="content" onChange={this.adjustHeight.bind(this)}/>
                <div className="add-post-image-wrapper">
                    {this.renderImages()}
                    <div className="add-post-add-images">
                        <label className="add-image-button" htmlFor="inputFile">
                            <i className="glyphicon glyphicon-plus glyphicon-add"/>
                        </label>
                        <input type="file" className="input-file" accept="image/*" multiple="multiple"
                               onChange={this.onChangeFiles.bind(this)} id="inputFile" disabled={this.state.isPosting}/>
                    </div>
                </div>
            </div>
        }
    }

    renderPages() {
        return this.state.pages.map((page, index) => {
            return <div key={index} className="add-post-page-item">
                <label className="page-name">
                    <FmsCheckbox className="add-post-checkbox" checked={page.isSelected}
                                 onChange={() => {
                                     this.onSelectPage(page)
                                 }}/>
                    {page.name}
                </label>
            </div>
        });
    }

    render() {
        let postisDisabled = (this.state.isHandling || this.state.isPosting
            || this.isNoSelectedPages() || this.isUploadingFiles());
        let cancelIsDisabled = this.state.isHandling || this.state.isPosting;
        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.closeModal();
                }}
                backdrop='static' keyboard={false}>
                <div className="inmodal">
                    <Modal.Header closeButton={true}>
                        <Modal.Title>
                            <div className="modal-title">Đăng bài mới cho các trang</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="selected-pages">{this.renderPages()}</div>
                        <hr/>
                        {this.renderBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default"
                                disabled={cancelIsDisabled}
                                onClick={() => {
                                    this.props.closeModal()
                                }}>
                            Hủy
                        </button>
                        <button className="btn btn-primary"
                                disabled={postisDisabled}
                                onClick={this.onPost.bind(this)}>
                            Đăng
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

export default FmsAddPostModal;