import React from 'react';
import FmsSwitch from './FmsSwitch';

export default class FmsSwitchTest extends React.Component {
    state = {
        switched: true
    }

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
        });
    };

    render() {
        return (
            <div>
                <p>Basic Switch</p>
                <FmsSwitch onClick={this.toggleSwitch} on={this.state.switched}/>

                <p>Disabled Switch</p>
                <FmsSwitch onClick={this.toggleSwitch} on={this.state.switched} enabled={false}/>

                <p>Custom classname</p>
                <FmsSwitch onClick={this.toggleSwitch} on={this.state.switched} className='other-class'/>
            </div>
        );
    }
}
