import React, {Component, Fragment} from "react";
import propTypes from 'prop-types';
import FmsTabs from "../../../commons/FmsTabs/FmsTabs";
import FmsTab from "../../../commons/FmsTabs/FmsTab";
import FmsSuccessOrdersTab from "./FmsSuccessOrdersTab";
import FmsFailureOrderTab from "./FmsFailureOrderTab";
import FmsBlankPage from "../../../commons/blank-page/FmsBlankPage";
import * as storage from "../../../helpers/storage";
import {getOrderView} from "../../../api/UserViewApi";

class FmsSavedOrderBody extends Component {

    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_ORDER_VIEW');

        this.state = {
            isFirstTime
        };

        if (isFirstTime) {
            this.updateOrderView(project_id);
        }
    }

    updateOrderView(project_id) {
        getOrderView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_ORDER_VIEW', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;
        if (nextProps.project && project !== nextProps.project) {
            this.updateOrderView(nextProps.project._id);
        }
    }

    render() {
        const {project} = this.props;
        const {isFirstTime} = this.state;

        return (
            <Fragment>
                {
                    isFirstTime
                        ? (
                            <FmsBlankPage title='Lưu trữ đơn hàng'>
                                <p>
                                    Bạn có thể cất giữ những đơn hàng không cần xử lí nữa vào đây.
                                </p>
                                {/*<div>*/}
                                    {/*<small>*/}
                                        {/*Không có đơn hàng nào để hiển thị!*/}
                                    {/*</small>*/}
                                {/*</div>*/}
                            </FmsBlankPage>
                        )
                        : (
                            <div className="wrapper wrapper-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <FmsTabs>
                                            <FmsTab
                                                title={{
                                                    content: 'Đơn giao thành công',
                                                    icon: 'fa fa-check green-text'
                                                }}
                                            >
                                                <FmsSuccessOrdersTab
                                                    project={project}
                                                />
                                            </FmsTab>

                                            <FmsTab
                                                title={{
                                                    content: 'Đơn bị hủy',
                                                    icon: 'fa fa-times red-text'
                                                }}
                                            >
                                                <FmsFailureOrderTab
                                                    project={project}
                                                />
                                            </FmsTab>

                                        </FmsTabs>
                                    </div>

                                </div>
                            </div>
                        )
                }
            </Fragment>
        )
    }
}

FmsSavedOrderBody.propTypes = {
    project: propTypes.object
};

export default FmsSavedOrderBody;