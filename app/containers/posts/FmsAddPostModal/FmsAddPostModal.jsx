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
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import {EditorState} from 'draft-js';
import $ from 'jquery';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import uuid from 'uuid';
import {connect} from "react-redux";

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const emojiPlugin = createEmojiPlugin();
const {EmojiSuggestions, EmojiSelect} = emojiPlugin;

const MAX_FILE_SIZE = 112202010;
const MAX_NUMBER_OF_FILE = 15;

const plugins = [
    hashtagPlugin,
    linkifyPlugin,
    emojiPlugin
];


class FmsAddPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            isHandling: false,
            files: [],
            states: [],
            editorState: EditorState.createEmpty(),
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
        let files = e.target.files;

        if (!files) return;
        files = Array.prototype.slice.call(files);

        if (files.length == 0) {
            console.log("Không chọn file nào")
        } else {
            const last_files = files[files.length - 1];
            const all_image = files.every(file => file.type.includes("image"));
            const all_video = files.every(file => file.type.includes("video"));

            if (last_files.type.includes("image")) {
                let _newFiles = [], _newStates = [];
                for (let i = 0; i < newFiles.length; i++) {
                    if (newFiles[i].type.includes("image")) {
                        _newFiles.push(newFiles[i])
                        _newStates.push(newStates[i])
                    }

                }
                newFiles = _newFiles;
                newStates = _newStates;
            }
            if (last_files.type.includes("video")) {
                let _newFiles = [], _newStates = [];

                if (files.length > 1) {
                    alert("Chỉ được chọn 1 video");
                    files.splice(0, 1);

                }
                _newFiles.push(newFiles[0])
                _newFiles.splice(0, 1);
                _newStates.push(newStates[0])
                _newStates.splice(0, 1);
                newFiles = _newFiles;
                newStates = _newStates
            }

            if (!all_image && !all_video) {
                alert("Chỉ được chọn video hoặc ảnh")
                files = [];
            }
        }




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

            fileApi.getS3SigningRequest(uuid().replace(/\D/g, ''), file.type)
                .then(data => {
                    let signedRequest = data.signedRequest;
                    let newFiles = this.state.files;
                    newFiles.forEach(f => {
                        if (f.name === file.name && f.lastModified === file.lastModified) {
                            f.url = data.url;
                        }
                    });
                    return fileApi.uploadFileToS3(file, signedRequest);
                    this.setState({files: newFiles});
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

    onChangeEditor = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onUnSelectImages(index) {
        const states = this.state.states;
        const files = this.state.files;
        const stateschange = states.filter((file, i) => i != index)
        const fileschange = files.filter((file, i) => i != index)

        this.setState({
            states: stateschange,
            files: fileschange
        });
    }

    onSetNullContent() {
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }

    async onPost() {
        let message = this.state.editorState.getCurrentContent().getPlainText();

        if (!message) {
            alert("Chưa có nội dung bài đăng.");
            return;
        }

        let pages = this.state.pages.filter(p => p.isSelected);
        let pages_fb_id = pages.map(p => p.fb_id);
        let images = this.state.files.map(f => f.url);
        const {files} = this.state;

        this.setState({isPosting: true});
        if (files.length == 0) {
            let content = {message, urls: images, published: true};
            try {
                await postsApi.addNewPost(pages_fb_id, content);
                this.onSetNullContent();
                this.props.closeModal();
                this.setState({isPosting: false, files: [], states: []});
                noti("success", `Đăng thành công bài viết cho ${pages_fb_id.length} trang.`);
            } catch (err) {
                this.setState({isPosting: false});
                alert("Something went wrong");
            }
        } else if (files) {
            const last_files = files[files.length - 1];

            if (last_files.type.includes("video")) {
                let video = files.filter(v => v.type.includes("video"));
                let content = {
                    file_url: video[0].url,
                    type: "video",
                    description: message
                };

                try {
                    await postsApi.addNewPost(pages_fb_id, content);
                    this.onSetNullContent();
                    this.props.closeModal();
                    this.setState({isPosting: false, files: [], states: []});
                    noti("success", `Đăng thành công bài viết cho ${pages_fb_id.length} trang.`);
                } catch (err) {
                    this.setState({isPosting: false});
                    alert("Something went wrong");
                    console.log(err)
                }
            }

            if (last_files.type.includes("image")) {
                let content = {message, urls: images, published: true};
                try {
                    await postsApi.addNewPost(pages_fb_id, content);
                    this.onSetNullContent();
                    this.props.closeModal();
                    this.setState({isPosting: false, files: [], states: []});
                    noti("success", `Đăng thành công bài viết cho ${pages_fb_id.length} trang.`);
                } catch (err) {
                    this.setState({isPosting: false});
                    alert("Something went wrong");
                }
            }

        }

    }

    adjustHeight() {
        let textarea = ReactDOM.findDOMNode(this.refs.content);
        $(textarea).height(this.refs.content.scrollHeight - 4);
    }

    componentWillMount() {
        this.onChangeAlias();
    }

    componentDidUpdate(prevProps, prevStates) {
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
                    <div className="wrapper-hover">
                        <i className="fa fa-times" onClick={() => this.onUnSelectImages(index)}/>

                    </div>

                    <FmsCroppedImage src={state} id={index} className="image"/>
                </div>
            }
        });
    }

    renderBody() {
        if (this.state.isHandling === true) {
            return <div className="spin-wrapper"><FmsSpin size={27}/></div>
        } else {
            return <div>
                {/*<textarea className="textarea-new-post" placeholder="Nhập nội dung"*/}
                {/*ref="content" onChange={this.adjustHeight.bind(this)}/>*/}
                <div className="add-post-image-wrapper">
                    {this.renderImages()}
                </div>
                <div className="add-post-add-images">
                    <button className="btn btn-primary btn-outline" htmlFor="inputFile">
                        <i className="fa fa-plus" style={{paddingRight: "2px"}}/>
                        Ảnh/Video...
                    </button>
                    {/*<label className="add-image-button" htmlFor="inputFile">*/}
                    {/*<i className="glyphicon glyphicon-plus glyphicon-add"/>*/}
                    {/*</label>*/}
                    <input type="file" className="input-file"
                           id="input-file"
                           accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp,
                           video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*"
                           multiple="multiple"
                           title="&nbsp;"
                           onChange={this.onChangeFiles.bind(this)} id="inputFile" disabled={this.state.isPosting}/>
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
        const {fb_id} = this.props.user;

        return (
            <Modal
                show={this.props.isShown}
                onHide={() => {
                    this.props.closeModal();
                }}
                backdrop='static' keyboard={false}>
                <div className="inmodal">
                    <Modal.Header closeButton={true} style={{borderBottom: "none", paddingLeft: "30px"}}>
                        <div className="selected-pages">{this.renderPages()}</div>
                        <hr style={{marginTop: "0px"}}/>
                        {/*<Modal.Title>*/}
                        {/**/}
                        {/*/!*<div className="modal-title">Đăng bài mới cho các trang</div>*!/*/}
                        {/*</Modal.Title>*/}
                    </Modal.Header>
                    <Modal.Body style={{background: "#FFF"}}>
                        <div className="row body-editor">
                            <div className="col-sm-1">
                                <img src={`https://graph.facebook.com/v2.10/${fb_id}/picture`}
                                     className="img-circle"
                                     width={48} height={48}/>
                            </div>
                            <div className="col-sm-9 editor-plugin">
                                <Editor
                                    placeholder="Viết gì đó..."
                                    editorState={this.state.editorState}
                                    onChange={this.onChangeEditor}
                                    plugins={plugins}
                                />

                            </div>
                            <div className="col-sm-1">
                                <EmojiSuggestions/>
                                <EmojiSelect/>
                            </div>
                        </div>


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


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(FmsAddPostModal);
