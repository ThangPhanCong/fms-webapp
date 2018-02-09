import React, {Component} from 'react';

class FmsButtonNotification extends Component {
    render() {
        return (
            <div className="mail-tools tooltip-demo m-t-md">
                <div className="btn-group pull-right">
                    <button className="btn btn-white btn-sm">
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <button className="btn btn-white btn-sm">
                        <i className="fa fa-arrow-right"></i>
                    </button>
                </div>
                <button className="btn btn-white btn-sm" data-placement="left" title="">
                    <i className="fa fa-floppy-o"></i> Lưu trữ
                </button>
                <button className="btn btn-white btn-sm" data-placement="top" title="">
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        )
    }
}

export default FmsButtonNotification;