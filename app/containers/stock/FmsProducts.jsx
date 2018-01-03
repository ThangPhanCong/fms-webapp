import React, {Component} from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";
import {getProducts} from "../../api/ProductApi";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsProductSearchBar from "./FmsProductSearchBar";
import FmsProductTable from "./FmsProductTable";
import FmsCreateNewProductModal from "./modals/FmsCreateNewProductModal";
import {delay} from 'utils/timeout-utils';

class FmsProducts extends Component {

    state = {
        project: null,
        products: [],
        isLoading: true,
        isShowCreateProductModal: false
    };

    onOpenModal() {
        this.setState({isShowCreateProductModal: true});
    }

    onCloseModal(shouldReload) {
        if (shouldReload) {
            this.updateProductList();
        }

        this.setState({isShowCreateProductModal: false});
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.state;
        if (!project || (nextProps.project && nextProps.project.alias !== project.alias)) {
            this.setState({project: nextProps.project});
            this.updateProductList(nextProps.project);
        }
    }

    updateProductList(project) {
        project = project || this.props.project;

        this.setState({isLoading: true});
        console.log('updateProductList');

        if (project) {
            getProducts(project.alias)
                .then(products => this.setState({products, isLoading: false}));
        }
    }

    reloadProducts() {
        const {project} = this.props;
        this.updateProductList(project);
    }

    render() {
        const {project} = this.props;
        const {
            products,
            isLoading,
            isShowCreateProductModal
        } = this.state;

        let projectName = 'Cửa hàng';
        if (project) {
            projectName = project.name;
        }

        return (
            [
                <FmsPageTitle key={1} title="Sản phẩm" route={`${projectName}/Quản lí kho/Sản phẩm`}/>,

                <div key={2} className="wrapper wrapper-content">
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
                                            <FmsSpin size={25} center={true}/>
                                            : <FmsProductTable products={products} project={project}
                                                               onReloadProducts={this.reloadProducts.bind(this)}/>
                                    }

                                    <FmsCreateNewProductModal
                                        isShown={isShowCreateProductModal}
                                        onClose={this.onCloseModal.bind(this)}
                                        project={project}
                                    />

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