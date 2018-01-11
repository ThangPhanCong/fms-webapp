import React from 'react';

import {MAX_TAG_ITEMS} from '../../../constants/tag';
import FmsColorCardItem from "../FmsColorCardItem/FmsColorCardItem";
import FmsPageTitle from "../../../commons/page-title/FmsPageTitle";
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import FmsColorCardModal from '../FmsColorCardModal/FmsColorCardModal';
import TagApi from '../../../api/TagApi';

class FmsColorCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            selectedCard: null,
            tags: [],
            isEditting: false,
            isLoading: true
        }
    }

    getTags(alias) {
        this.setState({isLoading: true});
        TagApi.getProjectTags(alias)
            .then(tags => {
                if (tags) this.setState({tags: tags});
                else alert("Something went wrong.");
                this.setState({isLoading: false});
            })
            .catch(err => {
                alert(err.message);
                this.setState({isLoading: false});
            })
    }

    componentDidMount() {
        if (this.props.project && this.props.project.alias) {
            this.getTags(this.props.project.alias);
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.project.alias !== this.props.project.alias) {
            this.getTags(this.props.project.alias);
        }
    }

    openModal(selectedCard) {
        this.setState({isShownModal: true, selectedCard});
    }

    closeModal() {
        this.setState({isShownModal: false});
    }

    addNewTag(tag) {
        this.setState({isEditting: true});
        TagApi.create(this.props.project.alias, tag.name, tag.color, tag.description)
            .then(() => {
                this.getTags(this.props.project.alias);
                this.setState({isEditting: false, isShownModal: false});
            })
            .catch(err => {
                alert(err.message);
                this.setState({isEditting: false});
            })
    }

    updateTag(tag) {
        this.setState({isEditting: true});
        TagApi.update(this.props.project.alias, tag._id, tag.name, tag.color, tag.description)
            .then(() => {
                this.getTags(this.props.project.alias);
                this.setState({isEditting: false, isShownModal: false});
            })
            .catch(err => {
                alert(err.message);
                this.setState({isEditting: false});
            })
    }

    deleteTag(tag) {
        let allowDelete = confirm("Bạn có chắc muốn xóa thẻ màu?");
        if (allowDelete) {
            this.setState({isEditting: true});
            TagApi.remove(this.props.project.alias, tag._id)
                .then(() => {
                    this.getTags(this.props.project.alias);
                    this.setState({isEditting: false, isShownModal: false});
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isEditting: false});
                })
        }
    }

    renderTags() {
        if (this.state.isLoading === false) {
            return this.state.tags.map((tag, index) => {
                return <FmsColorCardItem data={tag} key={index} index={index + 1}
                                         openModal={this.openModal.bind(this)} deleteTag={this.deleteTag.bind(this)}/>;
            });
        }
    }

    render() {
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Thẻ màu` : "";
        let isDisabled = this.state.tags.length >= MAX_TAG_ITEMS || this.state.isLoading;
        return (
            <div className="row">
                <div className="col-lg-12">
                    <FmsPageTitle title="Thẻ màu" route={route}/>
                    <div className="row color-cards-wrapper">
                        <div className="col-lg-12">
                            <button className="btn btn-primary btn-sm" type="button" name="button"
                                    onClick={() => {
                                        this.openModal()
                                    }} disabled={isDisabled}>
                                <i className="fa fa-plus"/> Thêm thẻ màu
                            </button>
                            <div className="count-cards">Số
                                lượng: {this.state.tags.length + " / " + MAX_TAG_ITEMS}</div>
                            <br/>
                        </div>
                        <div className="table-responsive color-cards-table">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Màu</th>
                                    <th>Tên thẻ</th>
                                    <th>Ghi chú</th>
                                    <th>Hiển thị</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderTags()}
                                </tbody>
                            </table>
                        </div>
                        {this.state.isLoading ?
                            <div className="spin-wrapper"><FmsSpin size={27}/></div> : null
                        }
                    </div>
                    <FmsColorCardModal isShown={this.state.isShownModal} closeModal={this.closeModal.bind(this)}
                                       data={this.state.selectedCard} tags={this.state.tags}
                                       isEditting={this.state.isEditting} addNewTag={this.addNewTag.bind(this)}
                                       deleteTag={this.deleteTag.bind(this)} updateTag={this.updateTag.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default FmsColorCards;
