import React, {Component, Fragment} from 'react';
import {delay} from 'utils/timeout-utils';
import {getProducts} from "../../api/ProductApi";
import FmsSpin from "../../commons/FmsSpin/FmsSpin";
import FmsProductSearchBar from "./FmsProductSearchBar";
import FmsProductTable from "./FmsProductTable";
import FmsCreateNewProductModal from "./modals/FmsCreateNewProductModal";
import FmsBlankPage from "../../commons/blank-page/FmsBlankPage";
import * as storage from "../../helpers/storage";
import {getProductView, postProductView} from "../../api/UserViewApi";

class FmsProductsBody extends Component {

    constructor(props) {
        super(props);

        const project_id = this.props.project._id;
        const isFirstTime = !storage.get(project_id + '_' + 'ALL_PRODUCT_VIEW');

        this.state = {
            products: [],
            filter: {},
            timeoutKey: null,
            isLoading: true,
            isShowCreateProductModal: false,
            isFirstTime
        };

        if (isFirstTime) {
            this.updateProductView(project_id);
        }
    }

    updateProductView(project_id) {
        getProductView(project_id)
            .then(rs => {
                if (rs.is_view) {
                    this.setState({isFirstTime: false});
                    storage.set(project_id + '_' + 'ALL_PRODUCT_VIEW', true);
                } else {
                    this.setState({isFirstTime: true});
                }
            })
    }

    skipFirstView() {
        delay(1000).then(() => this.setState({isFirstTime: false}));

        const project_id = this.props.project._id;
        storage.set(project_id + '_' + 'ALL_PRODUCT_VIEW', true);

        postProductView(project_id);
    }

    onOpenModal() {
        this.setState({isShowCreateProductModal: true});
    }

    onCloseModal(shouldReload) {
        const {isFirstTime} = this.state;

        if (shouldReload) {
            const {project} = this.props;
            this.updateProductList(project);

            if (isFirstTime) {
                this.skipFirstView();
            }
        }

        this.setState({isShowCreateProductModal: false});
    }

    onChangeFilter(filter) {
        const {project} = this.props;
        const {timeoutKey} = this.state;
        const before = 0.5 * 1000;

        if (timeoutKey) clearTimeout(timeoutKey);

        const newTimeoutKey = setTimeout(() => {
            this.updateProductList(project, filter);
            this.setState({timeoutKey: null});
        }, before);

        this.setState({filter, timeoutKey: newTimeoutKey});
    }

    updateProductList(project, filter = this.state.filter) {
        this.setState({isLoading: true});

        getProducts(project.alias, filter)
            .then(products => this.setState({products, isLoading: false}));
    }

    reloadProducts() {
        const {project} = this.props;
        this.updateProductList(project);
    }

    componentDidMount() {
        const {project} = this.props;

        if (project) {
            this.updateProductList(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {project} = this.props;

        if (project !== nextProps.project) {
            this.updateProductList(nextProps.project);
            this.updateProductView(nextProps.project._id);
        }
    }

    render() {
        const {project} = this.props;
        const {
            products,
            isLoading,
            isShowCreateProductModal,
            isFirstTime
        } = this.state;

        return (
            <Fragment>
                {
                    isFirstTime
                        ? (
                            <FmsBlankPage
                                title="Quản lí sản phẩm"
                            >
                                <p>
                                    Tất cả đơn hàng là nơi quản lí đơn hàng đang trong quá trình xử lí. Bạn có thể tạo mới,
                                    sửa đổi trạng thái đơn hàng bằng những thẻ màu.
                                </p>
                                <div style={{marginTop: 20}}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.onOpenModal.bind(this)}
                                    >
                                        <i className='fa fa-plus'
                                           style={{marginRight: 5}}
                                        />
                                        Thêm sản phẩm
                                    </button>
                                    <button
                                        className="btn btn-outline btn-white"
                                        onClick={() => this.skipFirstView()}
                                    >
                                        Bỏ qua
                                    </button>
                                </div>
                            </FmsBlankPage>
                        )
                        : (
                            <div className="wrapper wrapper-content">
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

                                                <FmsProductSearchBar onChangeFilter={this.onChangeFilter.bind(this)}/>

                                                {
                                                    isLoading ?
                                                        <FmsSpin size={25} center={true}/>
                                                        : <FmsProductTable products={products} project={project}
                                                                           onReloadProducts={this.reloadProducts.bind(this)}/>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

                <FmsCreateNewProductModal
                    isShown={isShowCreateProductModal}
                    onClose={this.onCloseModal.bind(this)}
                    project={project}
                />
            </Fragment>
        )
    }
}

export default FmsProductsBody;