import React, { Component } from 'react';
import FmsTransportingProviderDetailModal from "../modals/FmsTransportingProviderDetailModal";
import {providers} from '../../../constants/transporting-provider';
import giaohangtietkiem from 'images/giaohangtietkiem.png';
import viettelpost from 'images/viettelpost.png';

class FmsTransportingProviderTable extends Component {

    state = {
        selectedProvider: null,
        isShownDetailModal: false
    }
    
    onCloseDetailModal() {
        this.setState({isShownDetailModal: false});
    }

    onOpenDetailModal(selectedProvider) {
        this.setState({selectedProvider, isShownDetailModal: true});
    }

    renderTableHeader() {
        return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên đơn vị</th>
                    <th>Logo</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái</th>
                    <th>Cài đặt</th>
                </tr>
            </thead>
        )
    }

    getProviderLogo(name_slug) {
        switch (name_slug) {
            case 'viettel-post':
                return viettelpost;
            case 'giao-hang-tiet-kiem':
                return giaohangtietkiem;
        }

        return null;
    }

    renderTableBody() {
        return (
            <tbody>
            {
                providers.map(
                    (provider, i) => (
                        <tr key={provider.id}>
                            <td>{i + 1}</td>
                            <td>{provider.name}</td>
                            <td>
                                <img src={this.getProviderLogo(provider.name_slug)}/>
                            </td>
                            <td>{provider.created_time}</td>
                            <td>{
                                    provider.status === 'active' ? 
                                    <span className="label label-info">Hoạt động</span>
                                    : <span className="label label-danger">Dừng hoạt động</span>
                                }
                            </td>
                            <td>
                                <i className='fa fa-pencil clickable'
                                   onClick={() => {
                                       this.onOpenDetailModal(provider)
                                   }}
                                />
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        )
    }

    render() {
        const {
            selectedProvider,
            isShownDetailModal
        } = this.state;

        const {project_id} = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-striped">

                    {
                        this.renderTableHeader()
                    }

                    {
                        this.renderTableBody()
                    }
                </table>
                
                <FmsTransportingProviderDetailModal
                    onClose={this.onCloseDetailModal.bind(this)}
                    isShown={isShownDetailModal}
                    provider={selectedProvider}
                    project_id={project_id}
                />
            </div>
        );
    }
}

export default FmsTransportingProviderTable;
