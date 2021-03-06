import React from 'react';
import FmsTabHeader from "./FmsTabHeader";
import FmsTabPanel from "./FmsTabPanel";

class FmsTabs extends React.Component {

    state = {
        tabActive: 0
    };

    constructor(props) {
        super(props);

        const {tabActive} = this.props;
        if (tabActive !== undefined) {
            this.state = {tabActive}
        }
    }

    activeTab(index) {
        const {children, onHandleChange} = this.props;
        if (children[index].props.renderBody) {
            this.setState({tabActive: index});
            if (onHandleChange) onHandleChange(index);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {tabActive} = this.state;
        if (nextProps.tabActive && nextProps.tabActive !== tabActive) {
            this.setState({tabActive: nextProps.tabActive});
        }
    }

    render() {
        const {children} = this.props;
        const {tabActive} = this.state;
        const titles = children.map(child => child.props.title);

        return (
            <div className='tabs-container fms-tab'>
                <FmsTabHeader titles={titles} tabActive={tabActive} onSelectTab={this.activeTab.bind(this)}/>

                <div className='tab-content'>
                    <FmsTabPanel active={true} content={children[tabActive]}/>
                </div>
            </div>
        )
    }
}

export default FmsTabs;