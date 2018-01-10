import React from 'react';
import FmsCheckbox from './FmsCheckbox.jsx';

export default class FmsCheckboxTest extends React.Component {

    render() {
        return (
            <div style={{marginLeft: '20px'}}>
                <FmsCheckbox
                    checked={true}
                />

                <FmsCheckbox
                    checked={false}
                />
            </div>
        );
    }
}
