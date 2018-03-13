import React, {Component, Fragment} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import FmsTransportingProviderTable from "./transporting-providers/FmsTransportingProviderTable";
import FmsCreateTransportingProviderModal from './modals/FmsCreateTransportingProviderModal';
import {getAllProviders} from '../../api/TransportProviderApi';


class FmsTransportingProviders extends Component {

    state = {
        providers: [],
        isShownCreateModal: false
    };

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
        const {project} = this.props;
        if (nextProps.project) {
            this.getProviders();
        }
    }

    render () {
        const {project} = this.props;
        const {isShownCreateModal, providers} = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            <Fragment>
                <FmsPageTitle key={1} title="Quản lí vận chuyển"
                    route={`${projectName}/Quản lí vận chuyển`}/>

                <div key={2} className="wrapper wrapper-content">
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