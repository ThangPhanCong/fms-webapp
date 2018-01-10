import React, {Component} from "react";
import propTypes from 'prop-types';

class FmsTitleLineChart extends Component {

    render() {
        return (
            <span>
                <h1 className="m-b-xs">{this.props.countSales}</h1>
        <small>{this.props.title}</small>
      </span>
        )
    }
}

FmsTitleLineChart.propTypes = {
    countSales: propTypes.string
};

export default FmsTitleLineChart;