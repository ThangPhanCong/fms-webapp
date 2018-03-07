import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import ViettelPostPanel from './panels/ViettelPostPanel';
import OtherProviderPanel from './panels/OtherProviderPanel';
import {createViettelAccount, getViettelInfoAccount} from '../../../api/ViettelPostApi';
import {createOtherProvider} from '../../../api/TransportProviderApi';

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
        this.setState({typeProvider: e.target.value});
    }

    onCreateProvider() {
        const type = this.state.typeProvider;
        switch(type) {
            case 'VIETTEL':
                this.createViettelPost();
                break;
            case 'OTHER':
                this.createOtherProvider();
                break;
        }
    }

    createViettelPost() {
        const providerInfo = this.state.providerInfo;
        if (providerInfo.PASSWORD && providerInfo.PASSWORD.length > 7) {
            this.setState({isLoading: true});
            createViettelAccount(providerInfo)
                .then(res => {
                    this.setState({providerInfo: {}, isLoading: false});
                    let shouldUpdate = true;
                    this.closeModal(shouldUpdate);
                })
                .catch(err => {
                    alert(err);
                    this.setState({isLoading: false});
                });
        } else {
            alert('Mật khẩu phải lớn hơn 7 ký tự');
        }
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

    render() {
        const {
            isShown
        } = this.props;

        const {
            isLoading,
            providerInfo,
            typeProvider
        } = this.state;

        let panel = null;
        switch(typeProvider) {
            case 'VIETTEL':
                panel = <ViettelPostPanel onChangeInput={this.onChangeInput.bind(this)} 
                                            providerInfo={providerInfo}/>;
                break;
            case 'OTHER':
                panel = <OtherProviderPanel onChangeInput={this.onChangeInput.bind(this)} 
                                            providerInfo={providerInfo}/>;
                break;
        }
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
                                <option value=""></option>
                                <option value="VIETTEL">Viettel Post</option>
                                <option value="OTHER">Đơn vị khác</option>
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
                            disabled={isLoading}>Tạo mới
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

FmsCreateTransportingProviderModal.propTypes = {
    isShown: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
};

export default FmsCreateTransportingProviderModal;
