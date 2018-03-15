import React from 'react';
import uuid from 'uuid';
import {countOrders} from "../../api/OrderApi";
import {countProducts} from "../../api/ProductApi";
import {countStaffs} from "../../api/StaffApi";

class FmsProjectItem extends React.Component {

    state = {
        countOrders: null,
        countProducts: null,
        countStaffs: null
    };

    componentDidMount() {
        const {data} = this.props;

        countOrders(data._id)
            .then(payload => this.setState({countOrders: payload.total}));

        countProducts(data._id)
            .then(payload => this.setState({countProducts: payload.total}));

        countStaffs(data._id)
            .then(payload => this.setState({countStaffs: payload.total}));
    }

    renderPageItem() {
        let project = this.props.data;
        let pages = project.pages;
        const MAX_ITEM = 5;

        if (pages && Array.isArray(pages) && pages.length > 0) {
            let pageComponents =
                pages.filter((item, index) => {
                    return index <= MAX_ITEM;
                }).map((page, i) => {
                    const pageAva = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;

                    return (
                        <a key={i}><img className='img-circle' key={page.fb_id} src={pageAva}/></a>
                    )
                });

            if (pages.length > MAX_ITEM) {
                let moreText = '+' + (pages.length - MAX_ITEM);
                let itemMorePage = <a key={uuid()}><span className='more'>{moreText}</span></a>
                pageComponents = pageComponents.slice(0, MAX_ITEM);
                pageComponents.push(itemMorePage);
            }

            return pageComponents;
        } else {
            return <div/>
        }
    }

    render() {
        const {countOrders, countProducts, countStaffs} = this.state;
        const project = this.props.data;

        return (
            <div className="col-md-4">
                <div className="ibox">
                    <div className="ibox-content project-item" onClick={this.props.onClick}>

                        {/*<span className='pull-right'>Settings</span>*/}

                        <h2>{project.name}</h2>
                        <p className="small">
                            <span>Đơn hàng: </span>
                            <strong>{countOrders === null ? '' : countOrders}</strong>
                            &nbsp;&nbsp;&nbsp;
                            <span>Sản phẩm: </span>
                            <strong>{countProducts === null ? '' : countProducts}</strong>
                            &nbsp;&nbsp;&nbsp;
                            <span>Nhân viên: </span>
                            <strong>{countStaffs === null ? '' : countStaffs}</strong>
                        </p>

                        <div className="">
                            {
                                this.renderPageItem()
                            }
                        </div>

                        <div className="project-detail">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsProjectItem;