import React from 'react';
import FmsOrderDetailModal from "./FmsOrderDetailModal";
import {getTestOrder} from "../../api/OrderApi";

class FmsOrderDetailModalTest extends React.Component {

    state = {
        isShownModal: false,
        order: null
    };

    onOpenModal() {
        this.setState({isShownModal: true})
    }

    onCloseModal() {
        this.setState({isShownModal: false})
    }

    componentDidMount() {
        getTestOrder()
            .then(order => {
                this.setState({order});
            })
    }

    render() {
        const {
            isShownModal,
            order
        } = this.state;

        return (
            <div style={{marginLeft: '20px'}}>
                <button
                    onClick={this.onOpenModal.bind(this)}
                >Show modal
                </button>

                <FmsOrderDetailModal
                    isShown={isShownModal}
                    onClose={this.onCloseModal.bind(this)}
                    order={order}
                />
            </div>
        );
    }
}

export default FmsOrderDetailModalTest;