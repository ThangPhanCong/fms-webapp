import React, {Component} from "react";
import FmsFlotChart from "./FmsFlotChart";

class FmsFlotChartTest extends Component {
    render () {
        return (
          <FmsFlotChart data1 ={[[0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,20],[11,10],[12,13],
            [13,4],[14,7],[15,8],[16,12]]}
            data2={[[0,0],[1,2],[2,7],[3,4],[4,11],[5,4],[6,2],[7,5],[8,11],[9,5],[10,4],[11,1],[12,5],[13,2],[14,5],
              [15,2],[16,0]]}/>
        )
    }
}

export default FmsFlotChartTest;