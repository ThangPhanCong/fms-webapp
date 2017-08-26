var React = require('react');
var FmsPageItem = require('FmsPageItem');
var { browserHistory } = require('react-router');
var ListPagesAPI = require('ListPagesAPI');

var FmsPageList = React.createClass({
    getInitialState: function () {
        return {
            inactivePages: ListPagesAPI.getInactivePages(),
            activePages: ListPagesAPI.getActivePages()
        };
    },
    renderPages() {
        let pages = this.state.activePages;

        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id} inModal="false"></FmsPageItem>
        });
    },
    renderPagesInModal() {
        let pages = this.state.inactivePages;

        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id} inModal="true"></FmsPageItem>
        });
    },
    componentWillMount: function() {
        if (window.location == 'http://localhost:3000/pages#_=_') {
            browserHistory.replace('/pages');
        }
    },
    render: function () {
        return (
            <div id="dashboard-border" >
                <div id="div-list-page">
                    {this.renderPages()}
                </div>
                <div id="div-active-button">
                    <div id="description-active-button">Click Active button to view all available pages and active new pages</div>
                    <button id="active-button" className="button" type="button" data-toggle="modal" data-target="#myModal">Active Pages</button>
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
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Active</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FmsPageList;