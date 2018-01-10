import React from "react";
import {Table} from "react-bootstrap";

class FmsStatisticTableBody extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <Table className="table table-striped">

                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Master project</td>
                        <td>Patrick Smith</td>
                        <td>$892,074</td>
                        <td>Inceptos Hymenaeos Ltd</td>
                        <td><strong>20%</strong></td>
                        <td>Jul 14, 2015</td>
                        <td><a><i className="fa fa-check text-navy"/></a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Alpha project</td>
                        <td>Alice Jackson</td>
                        <td>$963,486</td>
                        <td>Nec Euismod In Company</td>
                        <td><strong>40%</strong></td>
                        <td>Jul 16, 2015</td>
                        <td><a><i className="fa fa-check text-navy"/></a></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default FmsStatisticTableBody;