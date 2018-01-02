import React from 'react';
import FmsTab from "./FmsTab";
import FmsTabs from "./FmsTabs";

class FmsTabTest extends React.Component {
    render() {
        return (
            <FmsTabs>
                <FmsTab title="ok men">
                    <p>ok men body</p>
                </FmsTab>

                <FmsTab title="ok men 2">
                    <p>ok men 2 body</p>
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