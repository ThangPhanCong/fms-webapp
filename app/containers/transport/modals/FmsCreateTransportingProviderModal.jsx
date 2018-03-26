import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import ViettelPostPanel from './panels/ViettelPostPanel';
import OtherProviderPanel from './panels/OtherProviderPanel';
import * as viettelApi from '../../../api/ViettelPostApi';
import * as ghtkApi from '../../../api/GiaoHangTietKiemApi';
import * as ghnApi from '../../../api/GiaoHangNhanhApi';
import * as shipchungApi from '../../../api/ShipChungApi';
import {createOtherProvider} from '../../../api/TransportProviderApi';
import GiaoHangTietKiemPanel from "./panels/GiaoHangTietKiemPanel";
import GiaoHangNhanhPanel from "./panels/GiaoHangNhanhPanel";
import ShipChungPanel from "./panels/ShipChungPanel";

class FmsCreateTransportingProviderModal extends Component {

    state = {
        providerInfo: {},
        isLoading: false,
        typeProvider: ''
    };

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal(shouldUpdate) {
        this.setState({typeProvider: '', providerInfo: {}});
        this.props.onClose(shouldUpdate);
    }

    onChangeTypeProvider(e) {
        const typeProvider = e.target.value;
        this.setState({typeProvider, providerInfo: {}});
    }

    onCreateProvider() {
        const type = this.state.typeProvider;
        switch (type) {
            case 'VIETTEL':
                this.createViettelPost();
                break;
            case 'SHIPCHUNG':
                this.createShipchung();
                break;
            case 'GHTK':
                this.createGHTK();
                break;
            case 'GHN':
                this.createGHN();
                break;
            case 'OTHER':
                this.createOtherProvider();
                break;
        }
    }

    createViettelPost() {
        this.setState({isLoading: true});

        const providerInfo = this.state.providerInfo;

        viettelApi.configExistedViettelAccount(providerInfo)
            .then(res => {
                this.setState({providerInfo: {}, isLoading: false});
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err);
                this.setState({isLoading: false});
            });
    }

    createShipchung() {
        this.setState({isLoading: true});

        const providerInfo = this.state.providerInfo;

        shipchungApi.createExistedAccount(providerInfo)
            .then(res => {
                this.setState({providerInfo: {}, isLoading: false});
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err);
                this.setState({isLoading: false});
            });
    }

    createGHTK() {
        const providerInfo = this.state.providerInfo;

        ghtkApi.createExistedAccount(providerInfo)
            .then(res => {
                this.setState({providerInfo: {}, isLoading: false});
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err);
                this.setState({isLoading: false});
            });
    }

    createGHN() {
        const providerInfo = this.state.providerInfo;

        ghnApi.createExistedAccount(providerInfo)
            .then(res => {
                this.setState({providerInfo: {}, isLoading: false});
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err);
                this.setState({isLoading: false});
            });
    }

    createOtherProvider() {
        const providerInfo = this.state.providerInfo;
        this.setState({isLoading: true});

        createOtherProvider(providerInfo)
            .then(res => {
                this.setState({providerInfo: {}, isLoading: false});
                let shouldUpdate = true;
                this.closeModal(shouldUpdate);
            })
            .catch(err => {
                alert(err);
                this.setState({isLoading: false});
            });
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newProvider = {...this.state.providerInfo};
        newProvider[refName] = newValue;

        this.setState({providerInfo: newProvider});
    }

    render() {
        const {
            isShown,
            activeProviders
        } = this.props;

        const {
            isLoading,
            providerInfo,
            typeProvider
        } = this.state;

        let panel = null;
        switch (typeProvider) {
            case 'VIETTEL':
                panel = <ViettelPostPanel onChangeInput={this.onChangeInput.bind(this)}
                                          providerInfo={providerInfo}/>;
                break;
            case 'SHIPCHUNG':
                panel = <ShipChungPanel onChangeInput={this.onChangeInput.bind(this)}
                                        providerInfo={providerInfo}/>;
                break;
            case 'GHTK':
                panel = <GiaoHangTietKiemPanel onChangeInput={this.onChangeInput.bind(this)}
                                               providerInfo={providerInfo}/>;
                break;
            case 'GHN':
                panel = <GiaoHangNhanhPanel onChangeInput={this.onChangeInput.bind(this)}
                                            providerInfo={providerInfo}/>;
                break;
            case 'OTHER':
                panel = <OtherProviderPanel onChangeInput={this.onChangeInput.bind(this)}
                                            providerInfo={providerInfo}/>;
                break;
        }

        const allProviders = [
            {name: 'VIETTEL', display_name: "Viettel Post"},
            {name: 'SHIPCHUNG', display_name: "Ship Chung"},
            {name: 'GHTK', display_name: "Giao Hàng Tiết Kiệm"},
            {name: 'GHN', display_name: "Giao Hàng Nhanh"},
            {name: 'OTHER', display_name: "Đơn vị khác"},
        ];

        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>
                            Tạo đơn vị vận chuyển
                            <select value={typeProvider || ''}
                                    onChange={this.onChangeTypeProvider.bind(this)}
                                    style={{fontSize: '15px', marginLeft: '15px'}}
                            >
                                <option value=""/>
                                {
                                    allProviders.filter(p => !activeProviders.find(ap => ap.provider_name === p.name))
                                        .map(p => <option key={p.name} value={p.name}>{p.display_name}</option>)
                                }
                            </select>
                        </h4>
                    </Modal.Header>

                    <Modal.Body>

                        {panel}
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            disabled={isLoading}>Hủy
                        </button>

                        <button
                            className='btn btn-primary'
                            onClick={this.onCreateProvider.bind(this)}
                            disabled={Object.keys(providerInfo).length === 0 || isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportingProviderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    activeProviders: propTypes.array,
};

export default FmsCreateTransportingProviderModal;
