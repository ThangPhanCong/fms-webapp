import React, {Component} from 'react';

class FmsBlankPage extends Component {

    render () {
        const {
            title,
            children
        } = this.props;

        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                {title}
                            </h1>
                            {
                                children
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsBlankPage;