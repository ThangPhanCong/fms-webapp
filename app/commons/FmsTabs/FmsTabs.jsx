import React from 'react';
import FmsTabHeader from "./FmsTabHeader";
import FmsTabPanel from "./FmsTabPanel";

class FmsTabs extends React.Component {

    state = {
        tabActive: 0,
        activePanel: null
    };

    activeTab(index) {
        const {children} = this.props;
        if (children[index].props.renderBody) {
            this.setState({tabActive: index, activePanel: children[index]});
        }
    }

    componentWillMount() {
        const {tabActive, children} = this.props;
        this.setState({tabActive: tabActive, activePanel: children[tabActive]});
    }

    componentWillReceiveProps(nextProps) {
        const {tabActive} = this.state;
        const {children} = this.props;
        if (nextProps && nextProps.tabActive !== tabActive) {
            this.setState({
                tabActive: nextProps.tabActive, 
                activePanel: children[nextProps.tabActive]}
            );
        }
    }

    render() {
        const {children} = this.props;
        const {activePanel, tabActive} = this.state;
        const titles = children.map(child => child.props.title);

        return (
            <div className='tabs-container fms-tab'>
                <FmsTabHeader titles={titles} tabActive={tabActive} onSelectTab={this.activeTab.bind(this)}/>

                <div className='tab-content'>
                    <FmsTabPanel active={true} content={activePanel}/>
                </div>
            </div>
        )
    }
}

export default FmsTabs;