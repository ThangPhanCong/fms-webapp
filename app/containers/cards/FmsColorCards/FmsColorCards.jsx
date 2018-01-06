import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

import {MAX_TAG_ITEMS} from '../../../constants/tag';
import {getTags} from '../../../actions/setting/setting-tag';
import FmsColorCardItem from "../FmsColorCardItem/FmsColorCardItem";
import FmsPageTitle from "../../../commons/page-title/FmsPageTitle";
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import FmsColorCardModal from '../FmsColorCardModal/FmsColorCardModal';

class FmsColorCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            selectedCard: null
        }
    }

    componentDidMount() {
        if (this.props.project && this.props.project.alias) {
            this.props.dispatch(getTags(this.props.project.alias));
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.project && this.props.project) || prevProps.project.alias !== this.props.project.alias) {
            this.props.dispatch(getTags(this.props.project.alias));
        }
    }

    openModal(selectedCard) {
        this.setState({isShownModal: true, selectedCard});
    }

    closeModal() {
        this.setState({isShownModal: false});
    }

    renderTags() {
        if (this.props.isSettingLoading === false) {
            return this.props.tags.map((tag, index) => {
                return <FmsColorCardItem data={tag} key={index} index={index + 1}
                                         onClick={() => {this.openModal(tag)}}/>;
            });
        }
    }

    render() {
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Thẻ màu` : "";
        let isDisabled = this.props.tags.length >= MAX_TAG_ITEMS || this.props.isSettingLoading;
        return (
            <div>
                <FmsPageTitle title="Thẻ màu" route={route}/>
                <div className="row color-cards-wrapper">
                    <div className="col-lg-12" >
                        <button className="btn btn-primary btn-sm" type="button" name="button"
                                onClick={() => {this.openModal()}} disabled={isDisabled}>
                            <i className="fa fa-plus"/> Thêm thẻ màu
                        </button>
                        <div className="count-cards">Số lượng: {this.props.tags.length + " / " + MAX_TAG_ITEMS}</div>
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
                    {this.props.isSettingLoading ?
                        <div className="spin-wrapper"><FmsSpin size={27}/></div> : null
                    }
                </div>
                <FmsColorCardModal isShown={this.state.isShownModal} closeModal={this.closeModal.bind(this)}
                                   data={this.state.selectedCard} alias={alias} key={uuid()}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSettingLoading: state.setting.setting.isSettingLoading,
        tags: state.setting.settingTag.tags
    }
};

export default connect(mapStateToProps)(FmsColorCards);
