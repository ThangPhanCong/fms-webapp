var React = require('react');
var FmsPageItem = require('FmsPageItem');

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
    render: function () {
        return (
            <div className="row">
                <h3>Pages</h3>
                {this.renderPages()}
            </div>
        );
    }
});

module.exports = FmsPageList;