var React = require('react');
var FmsClientItem = require('FmsClientItem');
var DashboardAPI = require('DashboardAPI');

var FmsClientList = React.createClass({
    render: function () {
        var renderClients = function () {
            var clients = DashboardAPI.getClients();
            return clients.map(function (client) {
                return <FmsClientItem data={client} key={client.fb_id}/>
            });
        };
        return (
            <div>
                {renderClients()}
            </div>
        );
    }
});

module.exports = FmsClientList;