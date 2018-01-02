import React from 'react';

class FmsTabPanel extends React.Component {
    render() {
        const {content, active} = this.props;

        return (
            <div className={`tab-pane ${active ? 'active' : ''}`}>
                {
                    content
                }
            </div>
        )
    }
}

export default FmsTabPanel;