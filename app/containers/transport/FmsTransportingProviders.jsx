import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsTransportingProviderTable from "./transporting-providers/FmsTransportingProviderTable";
import FmsCreateTransportingProviderModal from './modals/FmsCreateTransportingProviderModal';
import {getAllProviders} from '../../api/TransportProviderApi';
import * as storage from "../../helpers/storage";
import * as uiApi from "../../api/UserViewApi";
import FmsBlankPage from "../../commons/blank-page/FmsBlankPage";


class FmsTransportingProviders extends Component {

    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_TRANSPORTING_PROVIDER');

        this.state = {
            providers: [],
            isShownCreateModal: false,

            isFirstTime
        };

        if (isFirstTime) {
            this.updateOrderView(project_id);
        }
    }

    updateOrderView(project_id) {
        uiApi.getOrderView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_TRANSPORTING_PROVIDER', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    onOpenCreateModal() {
        this.setState({isShownCreateModal: true});
    }

    onCloseCreateModal(shouldUpdate) {
        if (shouldUpdate) {
            this.getProviders();
        }
        this.setState({isShownCreateModal: false});
    }

    getProviders() {
        getAllProviders()
            .then(providers => this.setState({providers}));
    }

    componentDidMount() {
        this.getProviders();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            this.getProviders();

            // update first view
            this.updateOrderView(nextProps.project._id);
        }
    }

    render() {
        const {project} = this.props;
        const {
            isShownCreateModal,
            providers,
            isFirstTime
        } = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle title="Quản lí vận chuyển"
                              route={`${projectName}/Quản lí vận chuyển`}/>

                {
                    isFirstTime ? (
                        <FmsBlankPage title="Quản lí vận chuyển">
                            <p>
                                Thực hiện hết nối với các đơn vị vận chuyển uy tín nhất và quản lí vận đơn tập trung
                                trên Adsbold.
                            </p>
                        </FmsBlankPage>
                    ) : (
                        <div className="wrapper wrapper-content">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox">
                                        <div className="ibox-content">
                                            <button className="btn btn-primary btn-sm" type="button"
                                                    style={{marginBottom: '10px'}}
                                                    onClick={this.onOpenCreateModal.bind(this)}>
                                                <i className="fa fa-plus"/> Thêm đơn vị vận chuyển
                                            </button>
                                            {
                                                providers.length > 0 ?
                                                    <FmsTransportingProviderTable providers={providers}/>
                                                    : <p className='text-center'>Chưa có đơn vị vận chuyển</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                <FmsCreateTransportingProviderModal
                    isShown={isShownCreateModal}
                    onClose={this.onCloseCreateModal.bind(this)}
                    providers={providers}
                    activeProviders={providers}
                />
            </Fragment>
        )
    }
}

export default FmsTransportingProviders;