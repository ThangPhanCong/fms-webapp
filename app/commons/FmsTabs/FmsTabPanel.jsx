import React from 'react';

class FmsTabPanel extends React.Component {

    render() {
        const {content, active} = this.props;

        return (
            <div className={`tab-pane ${active ? 'active' : ''}`}>
                <div className='panel-body'>
                    {
                        content
                    }
                </div>
            </div>
        )
    }
}

export default FmsTabPanel;