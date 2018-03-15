import React, {Component} from 'react';

class FmsTab extends Component {
    static defaultProps = {
        renderBody: true
    };

    render() {
        return this.props.children;
    }
}

export default FmsTab;