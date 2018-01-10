import React from 'react';
import FmsPageTitle from '../../commons/page-title/FmsPageTitle';

class FmsSettings extends React.Component {
    render() {
        if (!this.props.project) return <div/>;
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Cài đặt` : "";
        return (
            <div className="settings">
                <FmsPageTitle title="Cài đặt" route={route}/>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-8">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsSettings;
