import React from 'react';
import FmsTab from "./FmsTab";
import FmsTabs from "./FmsTabs";

class FmsTabTest extends React.Component {
    state = {
        tabActive: 1
    };

    handleChange(value) {
        this.setState({tabActive: value});
    }

    render() {
        return (
            <FmsTabs tabActive={this.state.tabActive}>
                <FmsTab title="ok men">
                    <p>ok men body</p>
                </FmsTab>

                <FmsTab title="ok men 2">
                    <p>ok men 2 body</p>
                    <button onClick={this.handleChange.bind(this, 0)}>Tab 1</button>
                </FmsTab>

                <FmsTab
                    title={<button onClick={() => {console.log('ok men ......')}}/>}
                    renderBody={false}
                />
            </FmsTabs>
        );
    }
}

export default FmsTabTest;