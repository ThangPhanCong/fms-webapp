import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import {getProducts} from "../../api/ProductApi";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsProductSearchBar from "./FmsProductSearchBar";
import FmsProductTable from "./FmsProductTable";
import FmsCreateNewProductModal from "./modals/FmsCreateNewProductModal";


class FmsProducts extends Component {

    state = {
        products: [],
        isLoading: true,
        isShowCreateProductModal: false
    };

    onOpenModal() {
        this.setState({isShowCreateProductModal: true});
    }

    onCloseModal() {
        this.setState({isShowCreateProductModal: false});
    }

    componentDidMount() {
        getProducts()
            .then(products => this.setState({products, isLoading: false}));
    }

    render() {
        const {project} = this.props;
        const {products, isLoading, isShowCreateProductModal} = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Sản phẩm" route={`${projectName}/Quản lí kho/Sản phẩm`}/>,

                <div key={2} className="wrapper wrapper-content animated fadeIn">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-content">

                                    <div className="row">
                                        <div className="col-lg-12" style={{paddingBottom: '20px'}}>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={this.onOpenModal.bind(this)}
                                            >
                                                <i className="fa fa-plus"/> Thêm sản phẩm
                                            </button>
                                            <br/>
                                        </div>
                                    </div>

                                    <FmsProductSearchBar/>

                                    {
                                        isLoading ?
                                            <FmsSpin size={25} center={true}/> :
                                            <FmsProductTable products={products}/>
                                    }

                                    {
                                        isShowCreateProductModal ?
                                            <FmsCreateNewProductModal
                                                isShown={isShowCreateProductModal}
                                                onClose={this.onCloseModal.bind(this)}/>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}


export default FmsProducts;