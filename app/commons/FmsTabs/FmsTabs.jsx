import React from 'react';
import FmsTabHeader from "./FmsTabHeader";
import FmsTabPanel from "./FmsTabPanel";

class FmsTabs extends React.Component {

    state = {
        tabActive: 0
    };

    activeTab (index) {
        this.setState({tabActive: index});
    }

    renderTabPanels(panels) {
        const {tabActive} = this.state;

        return panels.map(
            (panel, i) => <FmsTabPanel key={i} active={tabActive === i} content={panel}/>
        )
    }

    render() {
        const {children} = this.props;
        const {tabActive} = this.state;
        const titles = children.map(child => child.props.title);

        return (
            <div className='tabs-container fms-tab'>
                <FmsTabHeader titles={titles} tabActive={tabActive} onSelectTab={this.activeTab.bind(this)}/>

                <div className='tab-content'>
                    {
                        this.renderTabPanels(children)
                    }
                </div>
            </div>
        )
    }
}

export default FmsTabs;