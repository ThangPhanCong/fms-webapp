import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import ViettelPostPanel from './panels/ViettelPostPanel';
import GiaoHangTietKiemPanel from './panels/GiaoHangTietKiemPanel';
import {createViettelAccount, getViettelInfoAccount} from '../../../api/ViettelPostApi';

class FmsTransportingProviderDetailModal extends Component {

    state = {
        provider: {},
        providerInfo: {},
        isLoading: false,
        disabled: false
    };

    onCloseButtonClick() {
        this.setState({providerInfo: {}});
        this.closeModal();
    }

    closeModal() {
        this.props.onClose();
    }

    onUpdateProvider() {
        const type = this.props.provider.name_slug;
        switch(type) {
            case 'viettel-post':
                this.updateViettelPost();
                break;
            case 'giao-hang-tiet-kiem':
                this.updateGHTK();
                break;
        }
    }

    updateViettelPost() {
        const providerInfo = this.state.providerInfo;
        if (providerInfo.PASSWORD && providerInfo.PASSWORD.length > 7) {
            this.setState({isLoading: true});
            createViettelAccount(providerInfo)
                .then(res => {
                    console.log(res);
                    this.setState({providerInfo: {}, disabled: true, isLoading: false});
                    this.closeModal();
                })
                .catch(err => {
                    alert(err);
                    this.setState({isLoading: false});
                });
        } else {
            alert('Mật khẩu phải lớn hơn 7 ký tự');
        }
    }

    updateGHTK() {
        console.log('giao hàng tiết kiệm');
    }

    onChangeInput(refName, newValue = this.refs[refName].value) {
        const newProvider = {...this.state.providerInfo};

        switch (refName) {
            case 'PROVINCE_ID':
                newProvider.PROVINCE_ID = newValue;
                newProvider.DISTRICT_ID = '';
                newProvider.WARDS_ID = '';
                break;
            case 'DISTRICT_ID':
                newProvider.DISTRICT_ID = newValue;
                newProvider.WARDS_ID = '';
                break;
            default:
                newProvider[refName] = newValue;
        }

        this.setState({providerInfo: newProvider});
    }

    getProviderInfoAccount(type) {
        switch(type) {
            case 'viettel-post':
                getViettelInfoAccount()
                    .then(res => {
                        if (res.provider_register) {
                            this.setState({providerInfo: res.provider_register, disabled: true});
                        } else {
                            this.setState({providerInfo: {}, disabled: false});
                        }
                    });
                break;
            case 'giao-hang-tiet-kiem':
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.provider && nextProps.provider !== this.state.provider) {
            this.setState({provider: nextProps.provider});
            this.getProviderInfoAccount(nextProps.provider.name_slug);
        }
        if (nextProps.project_id && nextProps.project_id !== this.props.project_id) {
            this.getProviderInfoAccount(nextProps.provider.name_slug);
        }
    }

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            provider,
            providerInfo,
            disabled
        } = this.state;

        let panel = null;
        switch(provider.name_slug) {
            case 'viettel-post':
                panel = <ViettelPostPanel onChangeInput={this.onChangeInput.bind(this)} 
                                            providerInfo={providerInfo} disabled={disabled} />;
                break;
            case 'giao-hang-tiet-kiem':
                panel = <GiaoHangTietKiemPanel onChangeInput={this.onChangeInput.bind(this)} 
                                            providerInfo={providerInfo} disabled={disabled} />;
                break;
        }
        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Đơn vị vận chuyển: {provider.name}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Tên đơn vị</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control"
                                       ref='name'
                                       disabled={isLoading}
                                       value={provider.name || ''}
                                       onChange={() => {
                                           this.onChangeInput('name')
                                       }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="control-label">Trạng thái</label>
                            </div>
                            <div className="col-sm-9">
                                <select
                                       className="form-control"
                                       ref='status'
                                       disabled={isLoading}
                                       value={provider.status || 'active'}
                                       onChange={() => {
                                           this.onChangeInput('status')
                                       }}
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Dừng hoạt động</option>                                    
                                </select>
                            </div>
                        </div>
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
                            onClick={this.onUpdateProvider.bind(this)}
                            disabled={isLoading || disabled}>Cập nhật
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsTransportingProviderDetailModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    provider: propTypes.object
};

export default FmsTransportingProviderDetailModal;
