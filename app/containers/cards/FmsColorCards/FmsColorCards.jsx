import React from 'react';
import {connect} from 'react-redux';

import {MAX_TAG_ITEMS, TAG_COLORS} from '../../../constants/tag';
import {getTags, addNewTag, updateTag, deleteTag} from '../../../actions/setting/setting-tag';
import FmsColorCardItem from "../FmsColorCardItem/FmsColorCardItem";

class FmsColorCards extends React.Component {
    componentDidMount() {
        const {dispatch, alias} = this.props;
        dispatch(getTags(alias));
    }

    updateTag(tag) {
        const {dispatch, alias} = this.props;
        dispatch(updateTag(alias, tag));
    }

    deleteTag(tag) {
        const {dispatch, alias} = this.props;
        dispatch(deleteTag(alias, tag));
    }

    addNewTag(color, name) {
        const {dispatch, tags, alias} = this.props;
        let remainingColors = TAG_COLORS.filter(c => {
            let _tag = tags.find(t => t.color === c);
            return !_tag;
        });

        color = remainingColors.pop();
        dispatch(addNewTag(alias, color, name));
    }

    renderTags() {
        return this.props.tags.map((tag, index) => {
           return <FmsColorCardItem data={tag} key={index} index={index + 1}/>;
        });
    }

    render() {
        let {tags} = this.props;
        let countItem = `(${tags.length}/${MAX_TAG_ITEMS})`;
        return (
            <div>
                <div className="color-cards-title">
                    <h2>Thẻ màu</h2>
                    <ol className="breadcrumb">
                        <li>
                            <span>Shop bán giầy dép</span>
                        </li>
                        <li>
                            <span>Quản lí đơn hàng</span>
                        </li>
                        <li className="active">
                            <strong>Thẻ màu</strong>
                        </li>
                    </ol>
                </div>
                <div className="row color-cards-wrapper">
                    <div className="col-lg-12" >
                        <button className="btn btn-primary btn-sm" type="button" name="button">
                            <i className="fa fa-plus"/> Thêm thẻ màu
                        </button>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        alias: state.dashboard.conversations.alias,
        isSettingLoading: state.setting.isSettingLoading,
        tags: state.setting.settingTag.tags
    }
};

export default connect(mapStateToProps)(FmsColorCards);
