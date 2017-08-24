var React = require('react');
var FmsPageItem = require('FmsPageItem');
var { browserHistory } = require('react-router');

var FmsPageList = React.createClass({
    renderPages() {
        let pages = [
            { name: 'UET Chatbot', fb_id: '1037793939646192', category: 'Product/Service' },
            { name: 'Thinh Thom', fb_id: '1266831106759701', category: 'Product/Service' },
            { name: 'Something likes page', fb_id: '698047147071892', category: 'Product/Service' },
        ];

        return pages.map(function (page) {
            return <FmsPageItem data={page} key={page.fb_id}></FmsPageItem>
        });
    },
    componentWillMount: function() {
        if (window.location == 'http://localhost:3000/pages#_=_') {
            browserHistory.push('/pages');
        }
    },
    render: function () {
        return (
            <div>   
                {this.renderPages()}
            </div>
        );
    }
});

module.exports = FmsPageList;