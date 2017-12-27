import React from 'react';
import FmsDashboard from '../../dashboard/FmsDashboard/FmsDashboard';
import FmsPosts from '../../posts/FmsPosts/FmsPosts';
import FmsAllOrders from "../../orders/FmsAllOrders";
import {flatStructure} from "../../../utils/data-structure-utils";

const treeConfig = [
    {
        route: 'dashboard',
        title: 'Bảng điều khiển',
        icon: 'fa-th-large',
        headerColor: 'white',
        component: () => (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                Dashboard
                            </h1>
                            <small>
                                It is an application skeleton for a typical web app. You can use it to quickly bootstrap
                                your webapp projects.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        route: '#',
        title: 'Quản lí trang',
        icon: 'fa-flag',
        children: [
            {
                route: 'conversations',
                title: 'Cuộc hội thoại',
                headerColor: 'white',
                component: () => <FmsDashboard/>
            },
            {
                route: 'posts',
                title: 'Bài viết',
                headerColor: 'white',
                component: () => <FmsPosts/>
            },
            {
                route: 'conversation-tags',
                title: 'Thẻ màu',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Thẻ màu</p>
                }
            },
            {
                route: 'conversation-settings',
                title: 'Cài đặt',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Cài đặt</p>
                }
            }
        ]
    },
    {
        route: '#',
        title: 'Quản lí đơn hàng',
        icon: 'fa-files-o',
        children: [
            {
                route: 'orders',
                title: 'Tất cả đơn hàng',
                headerColor: '#f3f3f4',
                component: () => <FmsAllOrders />
            },
            {
                route: 'saved-orders',
                title: 'Lưu trữ đơn',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Lưu trữ đơn</p>
                }
            },
            {
                route: 'order-tags',
                title: 'Thẻ màu',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Thẻ màu</p>
                }
            }
        ]
    },
    {
        route: '#',
        title: 'Quản lí kho',
        icon: 'fa-cubes',
        children: [
            {
                route: 'stock',
                title: 'Yêu cầu xuất hàng',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Yêu cầu xuất hàng</p>
                }
            },
            {
                route: 'products',
                title: 'Sản phẩm',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Sản phẩm</p>
                }
            }
        ]
    },
    {
        route: '#',
        title: 'Quản lí vận chuyển',
        icon: 'fa-truck',
        children: [
            {
                route: 'transport-orders',
                title: 'Yêu cầu vận chuyển',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Yêu cầu vận chuyển</p>
                }
            },
            {
                route: 'transporting-orders',
                title: 'Đang vận chuyển',
                headerColor: '#f3f3f4',
                component: () => {
                    return <p>Đang vận chuyển</p>
                }
            }
        ]
    },

];

export default treeConfig;

export const flatConfig = flatStructure(treeConfig);