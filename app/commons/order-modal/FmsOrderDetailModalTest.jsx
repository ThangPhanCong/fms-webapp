import React from 'react';
import FmsOrderDetailModal from "./FmsOrderDetailModal";
import {getTestOrder} from "../../api/OrderApi";
import FmsCreateOrderModal from "./FmsCreateOrderModal";

class FmsOrderDetailModalTest extends React.Component {

    state = {
        isShownModal1: false,
        isShownModal2: false,
        isShownModal3: false,
        isShownModal4: false,
        isShownCreateOrderModal: false,
        typeModal: 1,
        order: null
    };

    onOpenModal(numb) {
        this.setState({
            typeModal: numb,
        });
        this.setState({
            ['isShownModal'+numb]: true
        });
    }

    onCloseModal(numb) {
        this.setState({['isShownModal'+numb]: false})
    }

    onOpenCreateOrderModal() {
        this.setState({isShownCreateOrderModal: true})
    }

    onCloseCreateOrderModal() {
        this.setState({isShownCreateOrderModal: false})
    }

    componentDidMount() {
        getTestOrder()
            .then(order => {
                this.setState({order});
            })
    }

    render() {
        const {
            isShownModal1,
            isShownModal2,
            isShownModal3,
            isShownModal4,
            isShownCreateOrderModal,
            order,
            typeModal
        } = this.state;

        return (
            <div style={{marginLeft: '20px'}}>
                <button
                    onClick={this.onOpenModal.bind(this, 1)}
                >Show modal 1
                </button>
                <button
                    onClick={this.onOpenModal.bind(this, 2)}
                >Show modal 2
                </button>
                <button
                    onClick={this.onOpenModal.bind(this, 3)}
                >Show modal 3
                </button>
                <button
                    onClick={this.onOpenModal.bind(this, 4)}
                >Show modal 4
                </button>
                <button
                    onClick={this.onOpenCreateOrderModal.bind(this)}
                >Show create order modal
                </button>

                <FmsOrderDetailModal
                    isShown={isShownModal1}
                    onClose={this.onCloseModal.bind(this, 1)}
                    typeModal={typeModal}
                    order={order}
                />
                <FmsOrderDetailModal
                    isShown={isShownModal2}
                    onClose={this.onCloseModal.bind(this, 2)}
                    typeModal={typeModal}
                    order={order}
                />
                <FmsOrderDetailModal
                    isShown={isShownModal3}
                    onClose={this.onCloseModal.bind(this, 3)}
                    typeModal={typeModal}
                    order={order}
                />
                <FmsOrderDetailModal
                    isShown={isShownModal4}
                    onClose={this.onCloseModal.bind(this, 4)}
                    typeModal={typeModal}
                    order={order}
                />
                <FmsCreateOrderModal
                    isShown={isShownCreateOrderModal}
                    onClose={this.onCloseCreateOrderModal.bind(this)}
                    project={{alias: 'tmu'}}
                />
            </div>
        );
    }
}

export default FmsOrderDetailModalTest;