import React from 'react';

import FmsSpin from '../FmsSpin/FmsSpin';

class FmsLoading extends React.Component {
    render() {
        return (
            <div className="loading-wrapper">
                <div className="center">
                    <FmsSpin size={50}/>
                </div>
            </div>
        )
    }
}

export default FmsLoading;
