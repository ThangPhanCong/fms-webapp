import React, {Component} from 'react';
import FmsTransportingProviderDetailModal from "../modals/FmsTransportingProviderDetailModal";
import viettelpost from 'images/viettelpost.png';
import icGHTK from 'images/ic_ghtk.png';
import {getViettelInfoAccount} from '../../../api/ViettelPostApi';
import {toReadableDatetime} from 'utils/datetime-utils';

class FmsTransportingProviderTable extends Component {

    state = {
        selectedProvider: null,
        isShownDetailModal: false
    };

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
                <th>Chi tiết</th>
            </tr>
            </thead>
        )
    }

    getProviderLogo(name) {
        switch (name) {
            case 'VIETTEL':
                return viettelpost;
            case 'GHTK':
                return icGHTK;
        }

        return null;
    }

    renderTableBody() {
        const {providers} = this.props;

        return (
            <tbody>
            {
                providers.map(
                    (provider, i) => (
                        <tr key={provider._id}>
                            <td>{i + 1}</td>
                            <td>{provider.provider_display_name}</td>
                            <td>
                                <img height={30} src={this.getProviderLogo(provider.provider_name)}/>
                            </td>
                            <td>{provider.created_time ? toReadableDatetime(provider.created_time).date : ''}</td>
                            <td>
                                {
                                    provider.provider_register ?
                                        <span className="label label-info">Hoạt động</span>
                                        : null
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
                />
            </div>
        );
    }
}

export default FmsTransportingProviderTable;
