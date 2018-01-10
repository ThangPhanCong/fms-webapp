import React from 'react';
import $ from 'jquery'
import propTypes from 'prop-types'
import '../../../assets/js/linechart/jquery.sparkline';

class FmsLineChart extends React.Component {

    state = {
        sparkResizeTimeout: null
    };

    draw() {
        const {
            id,
            data
        } = this.props;

        $(`#${id}`).sparkline(data, {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#1ab394',
            fillColor: "transparent"
        });
    }

    registerOnResize() {
        $(window).resize(() => {
            const {sparkResizeTimeout} = this.state;

            if (sparkResizeTimeout) clearTimeout(sparkResizeTimeout);
            const newSparkResizeTimeout = setTimeout(this.draw.bind(this), 500);
            this.setState({sparkResizeTimeout: newSparkResizeTimeout})
        });
    }

    componentDidMount() {
        this.registerOnResize();
        this.draw();
    }

    render() {
        return (
            <div id={this.props.id}
                 className='m-b-sm'
            />
        );
    }
}

FmsLineChart.propTypes = {
    id: propTypes.string.isRequired
};

export default FmsLineChart;
