import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import ViettelPostPanel from './panels/ViettelPostPanel';
import OtherProviderPanel from './panels/OtherProviderPanel';
import GiaoHangTietKiemPanel from "./panels/GiaoHangTietKiemPanel";

class FmsTransportingProviderDetailModal extends Component {

    state = {
        provider: {},
        providerInfo: {},
        isLoading: false,
        disabled: true
    };

    onCloseButtonClick() {
        this.closeModal();
    }

    closeModal() {
        this.props.onClose();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.provider && nextProps.provider !== this.state.provider) {
            this.setState({provider: nextProps.provider, providerInfo: nextProps.provider.provider_register});
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
        switch(provider.provider_name) {
            case 'VIETTEL':
                panel = <ViettelPostPanel providerInfo={providerInfo} disabled={disabled} />;
                break;
            case 'GHTK':
                panel = <GiaoHangTietKiemPanel providerInfo={providerInfo} disabled={disabled} />;
                break;
            default:
                panel = <OtherProviderPanel providerInfo={providerInfo} disabled={disabled} />;
                break;
        }
        return (
            <Modal show={isShown} backdrop='static' keyboard={false} bsSize='large'>
                <div className='inmodal'>
                    <Modal.Header
                        closeButton={true}
                        onHide={this.onCloseButtonClick.bind(this)}
                    >
                        <h4 className='modal-title'>Cấu hình tài khoản {provider.provider_display_name}</h4>

                    </Modal.Header>

                    <Modal.Body>
                        {panel}
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            className='btn btn-white'
                            onClick={this.onCloseButtonClick.bind(this)}
                            >Đóng
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
