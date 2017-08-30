var React = require('react');
var FmsPageItem = require('FmsPageItem');
var { browserHistory } = require('react-router');
var PagesAPI = require('PagesAPI');
var FmsActivePageModal = require('FmsActivePageModal');

var FmsPageList = React.createClass({
    getInitialState: function () {
        return { 
            active: [],
            inactive: []
        }
    },
    updatePages: function () {
        var that = this;
        PagesAPI.getPages().then(function (pages) {
            that.setState({
                active: pages.active,
                inactive: pages.inactive
            });
        }, function (err) {
            throw new Error(err);
        })
    },
    handleClickOnPage: function (data) {
        var id = data.fb_id;
        browserHistory.push('/' + id);
    },
    renderPages() {
        var that = this;
        var pages = this.state.active;
        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id} onPageClick={that.handleClickOnPage}></FmsPageItem>
        });
    },
    componentWillMount: function () {
        if (window.location == 'http://localhost:3000/pages#_=_') {
            browserHistory.replace('/pages');
        }
    },
    componentDidMount: function () {
        this.updatePages();
    },
    openModal: function () {
        this._child.open();
    },
    render: function () {
        return (
            <div id="dashboard-border" >
                <div id="div-list-page">
                    {this.renderPages()}
                </div>
                <div id="div-active-button">
                    <div id="description-active-button">Click Active button to view all available pages and active new pages</div>
                    <button id="active-button" className="button" onClick={this.openModal}>Choose Pages</button>
                </div>
                <FmsActivePageModal ref={(child) => {this._child = child;}} inactive={this.state.inactive} updatePages={this.updatePages}/>
            </div>
        );
    }
});

module.exports = FmsPageList;