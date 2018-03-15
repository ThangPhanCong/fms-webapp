import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import uuid from "uuid";
import FmsLineChart from "../../commons/charts/FmsLineChart/FmsLineChart";
import FmsTitleLineChart from "../../commons/charts/FmsLineChart/FmsTitleLineChart";
import FmsTableLineChart from "../../commons/charts/FmsLineChart/FmsTableLineChart";
import FmsLabelLineChart from "../../commons/charts/FmsLineChart/FmsLabelLineChart";
import FmsLineChartCanvas from "../../commons/charts/FmsLineChartCanvas/FmsLineChartCanvas";
import FmsStatisticTable from "./table/FmsStatisticTable";
import FmsBlankPage from "../../commons/blank-page/FmsBlankPage";

const lineData1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Example dataset",
            backgroundColor: "rgba(26,179,148,0.5)",
            borderColor: "rgba(26,179,148,0.7)",
            pointBackgroundColor: "rgba(26,179,148,1)",
            pointBorderColor: "#fff",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
            label: "Example dataset",
            backgroundColor: "rgba(220,220,220,0.5)",
            borderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderColor: "#fff",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class FmsStatistic extends Component {
    render() {
        return (
            <FmsBlankPage title='Bảng điều khiển'>
                <p>
                    Bảng điều khiển là nơi thu thập thông tin về cửa hàng, đưa những số liệu thành biểu đồ giúp bạn tiện theo dõi, đánh giá.
                </p>
            </FmsBlankPage>
        );

        // return (
        //     <div className="wrapper wrapper-content animated fadeIn">
        //         <div className="p-w-md m-t-sm">
        //             <Row>
        //                 <Col sm={4}>
        //                     <FmsTitleLineChart countSales="26,900" title="Sales in current month"/>
        //                     <FmsLineChart data={[34, 43, 43, 35, 44, 32, 44, 52]} id={uuid()}/>
        //                     <FmsLabelLineChart/>
        //                 </Col>
        //
        //                 <Col sm={4}>
        //                     <FmsTitleLineChart countSales="98,100" title="Sales in last 24h"/>
        //                     <FmsLineChart data={[32, 11, 25, 37, 41, 32, 34, 42]} id={uuid()}/>
        //                     <FmsLabelLineChart/>
        //                 </Col>
        //
        //                 <Col sm={4}>
        //                     <FmsTableLineChart/>
        //
        //                     <table className="table small m-t-sm">
        //                         <tbody>
        //                         <tr>
        //                             <td><strong>142</strong> Projects</td>
        //                             <td><strong>22</strong> Messages</td>
        //                         </tr>
        //                         <tr>
        //                             <td><strong>61</strong> Comments</td>
        //                             <td><strong>54</strong> Articles</td>
        //                         </tr>
        //                         <tr>
        //                             <td><strong>154</strong> Companies</td>
        //                             <td><strong>32</strong> Clients</td>
        //                         </tr>
        //                         </tbody>
        //                     </table>
        //                 </Col>
        //             </Row>
        //
        //             <Row>
        //                 <Col lg={12}>
        //                     <Col className="small pull-left m-l-lg m-t-md" md={3}>
        //                         <strong>Sales char</strong> have evolved over the years sometimes.
        //                     </Col>
        //
        //                     <Col className="small pull-right m-t-md text-right" md={3}>
        //                         <strong>There are many</strong> variations of passages of Lorem Ipsum available, but the
        //                         majority have suffered.
        //                     </Col>
        //                 </Col>
        //             </Row>
        //
        //             <div className="row">
        //                 <div className="col-lg-12">
        //                     <FmsLineChartCanvas lineData={lineData1}/>
        //                 </div>
        //             </div>
        //
        //             <FmsStatisticTable />
        //         </div>
        //     </div>
        // )
    }
}

export default FmsStatistic;
