var React = require('react');
var FmsPageItem = require('FmsPageItem');
var { browserHistory } = require('react-router');
var PagesAPI = require('PagesAPI');

var tempPages = [];

var FmsPageList = React.createClass({
    getInitialState: function () {
        return {
            pages: [],
            active: [],
            inactive: []
        }
    },
    getPages: function (isActive) {
        var that = this;
        PagesAPI.getPages(isActive).then(function (pages) {
            if (isActive == 1) that.setState({ active: pages });
            else if (isActive == -1) that.setState({ inactive: pages });
            else that.setState({ pages: pages });
        }, function (err) {
            throw new Error(err);
        })
    },
    handleActiveButton: function () {
        var active = this.state.active, inactive = [];
        if (tempPages.length == 0) return;
        tempPages.map(function (page) {
            if (page.is_active) {
                active.push(page);
            } else {
                inactive.push(page);
            }
        });
        this.setState({ 
            active: active,
            pages: tempPages,
            inactive: inactive
        });
        tempPages = [];
    },
    handleClickOnPage: function (isSelected, id) {
        var pages = this.state.inactive;
        pages.map(function (page) {
            if (page.fb_id == id) {
                page.is_active = isSelected;
            }
        });
        tempPages = pages;
    },
    renderPages() {
        var pages = this.state.active;
        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id} inModal="false"></FmsPageItem>
        });
    },
    renderPagesInModal() {
        var that = this;
        var pages = this.state.inactive;
        if (pages.length == 0) {
            return <p>All your pages is active. Nothing to show!</p>
        }
        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id} inModal="true" onPageClick={that.handleClickOnPage} onActiveClick={that.handleActiveButton}></FmsPageItem>
        });
    },
    componentWillMount: function () {
        if (window.location == 'http://localhost:3000/pages#_=_') {
            browserHistory.replace('/pages');
        }
    },
    componentDidMount: function () {
        this.getPages(1);
        this.getPages(0);
        this.getPages(-1);
    },
    render: function () {
        var hasInactive = this.state.inactive.length > 0 ? "" : " disabled";
        var handleActiveButton = this.state.inactive.length > 0 ? this.handleActiveButton : '';
        return (
            <div id="dashboard-border" >
                <div id="div-list-page">
                    {this.renderPages()}
                </div>
                <div id="div-active-button">
                    <div id="description-active-button">Click Active button to view all available pages and active new pages</div>
                    <button id="active-button" className="button" type="button" data-toggle="modal" data-target="#myModal">Choose Pages</button>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Choose pages to active</h4>
                            </div>
                            <div className="modal-body">
                                {this.renderPagesInModal()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className={"btn btn-primary" + hasInactive} data-dismiss="modal" onClick={handleActiveButton}>Active</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FmsPageList;