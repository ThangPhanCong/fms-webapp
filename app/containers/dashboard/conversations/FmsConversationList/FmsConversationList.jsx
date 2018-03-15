import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import searchImg from '../../../../assets/images/search.png';
import FmsConversationItem from '../FmsConversationItem/FmsConversationItem';

import FmsSpin from '../../../../commons/FmsSpin/FmsSpin';

import FmsFilterTags from '../FmsFilterTags/FmsFilterTags';
import FmsScrollableDiv from '../../../../commons/scroll-bar/FmsScrollableDiv';

import {handleConversationClick, loadMoreConversations} from '../../../../actions/dashboard/conversations';
import {setSearchText, handleFilter} from '../../../../actions/dashboard/filters';

// transform to state
let timeout;

class FmsConversationList extends React.Component {

    selectConversation(data) {
        const { dispatch } = this.props;
        dispatch(handleConversationClick(this.props.alias, data, data.type));
    }

    handleSearchChange() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let {dispatch} = this.props;
            dispatch(setSearchText(this.refs.searchText.value));
            dispatch(handleFilter(this.props.alias));
        }, 800);
    }

    handleLoadMore() {
        this.props.dispatch(loadMoreConversations(this.props.alias));
    }

    renderConversations() {
        const {conversations} = this.props;
        if (!conversations) return;

        return conversations.map(conversation => {
            const isSelected = (this.props.conversation && this.props.conversation._id === conversation._id);

            return (
                <FmsConversationItem
                    key={conversation._id}
                    data={conversation}
                    isSelected={isSelected}
                    onSelect={this.selectConversation.bind(this)}
                />
            )
        });
    }

    render() {
        const showSpin = (this.props.isLoadingConversations === true) ? "" : " hide";

        return (
            <div className="client-list-wrapper">
                <div className="search-client">
                    <img className="search-icon" src={searchImg}/>
                    <input type="text"
                           className="input-search-client"
                           ref="searchText"
                           onChange={this.handleSearchChange.bind(this)} defaultValue={this.props.searchText}
                    />
                    <FmsFilterTags alias={this.props.alias}/>
                </div>
                <FmsScrollableDiv
                    className="scroll-list"
                    handleLoadMore={this.handleLoadMore.bind(this)}
                >
                    {this.renderConversations()}

                    <div className={"client-list-spin" + showSpin}>
                        <FmsSpin size={27}/>
                    </div>
                </FmsScrollableDiv>
            </div>
        );
    }
}

FmsConversationList.propTypes = {
    alias: propTypes.string
};

const mapStateToProps = state => {
    return {
        conversations: state.dashboard.conversations.conversations,
        conversation: state.dashboard.chat.conversation,
        isLoadingConversations: state.dashboard.conversations.isLoadingConversations,
        searchText: state.dashboard.filters.searchText
    }
};

export default connect(mapStateToProps)(FmsConversationList);
