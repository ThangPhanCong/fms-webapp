import React from 'react';
import FmsDashboard from '../../dashboard/FmsDashboard/FmsDashboard';
import FmsPosts from '../../posts/FmsPosts/FmsPosts';
import FmsAllOrders from "../../orders/FmsAllOrders";
import {flatStructure} from "../../../utils/data-structure-utils";
import FmsSavedOrders from "../../orders/FmsSavedOrders";
import FmsTagOrders from "../../orders/FmsOrderTags";
import FmsColorCards from "../../cards/FmsColorCards/FmsColorCards";
import FmsProducts from "../../stock/FmsProducts";
import FmsStatistic from "../../statistic/FmsStatistic";
import FmsExportOrders from "../../stock/FmsExportOrders";
import FmsSettings from '../../settings/FmsProjectSettings';
import FmsConversationSettings from '../../conversation-settings/FmsConversationSettings';
import FmsStaffs from '../../staff/FmsStaffs';
import FmsTransportingProviders from "../../transport/FmsTransportingProviders";
import FmsTransportingOrder from "../../transport/FmsTransportingOrder";

export const treeConfig = [
    {
        route: 'dashboard',
        required: 'dashboard_view',
        title: 'Bảng điều khiển',
        icon: 'fa-th-large',
        headerColor: 'white',
        component: (props) => <FmsStatistic {...props}/>
    },
    {
        route: '#',
        title: 'Quản lí trang',
        icon: 'fa-flag',
        children: [
            {
                route: 'conversations',
                required: 'conversation_view',
                title: 'Cuộc hội thoại',
                headerColor: '#f3f3f4',
                hasBorderBottom: true,
                component: (props) => <FmsDashboard {...props}/>
            },
            {
                route: 'posts',
                required: 'post_view',
                title: 'Bài viết',
                headerColor: '#f3f3f4',
                hasBorderBottom: false,
                component: (props) => <FmsPosts {...props}/>
            },
            {
                route: 'conversation-tags',
                required: 'conversationtag_view',
                title: 'Thẻ màu',
                headerColor: '#f3f3f4',
                component: (props) => {
                    return <FmsColorCards {...props}/>
                }
            },
            {
                route: 'conversation-settings',
                required: 'page_view',
                title: 'Cài đặt',
                headerColor: '#f3f3f4',
                component: (props) => {
                    return <FmsConversationSettings {...props}/>
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
                required: 'allorder_view',
                title: 'Tất cả đơn hàng',
                headerColor: '#f3f3f4',
                component: (props) => <FmsAllOrders {...props}/>
            },
            {
                route: 'export-order',
                required: 'allorder_view',
                title: 'Yêu cầu xuất hàng',
                headerColor: '#f3f3f4',
                component: (props) => <FmsExportOrders {...props}/>
            },
            {
                route: 'transporting-orders',
                required: 'allorder_view',
                title: 'Đang vận chuyển',
                headerColor: '#f3f3f4',
                component: (props) => <FmsTransportingOrder {...props}/>
            },
            {
                route: 'saved-orders',
                required: 'savedorder_view',
                title: 'Lưu trữ đơn',
                headerColor: '#f3f3f4',
                component: (props) => <FmsSavedOrders {...props}/>
            },
            {
                route: 'order-tags',
                required: 'ordertag_view',
                title: 'Thẻ màu',
                headerColor: '#f3f3f4',
                component: (props) => <FmsTagOrders {...props}/>
            }
        ]
    },
    {
        route: 'products',
        title: 'Quản lí kho',
        icon: 'fa-cubes',
        required: 'product_view',
        headerColor: '#f3f3f4',
        component: (props) => <FmsProducts {...props}/>
    },
    {
        route: 'transport-providers',
        title: 'Quản lí vận chuyển',
        icon: 'fa-truck',
        required: 'transportunit_view',
        headerColor: '#f3f3f4',
        component: (props) => <FmsTransportingProviders {...props}/>
    },
    {
        route: 'staffs',
        required: 'staff_view',
        title: 'Quản lí nhân viên',
        icon: 'fa-users',
        headerColor: '#f3f3f4',
        component: (props) => <FmsStaffs {...props}/>
    },
    {
        route: 'settings',
        required: 'settings_view',
        title: 'Cài đặt chung',
        icon: 'fa-cog',
        headerColor: '#f3f3f4',
        component: (props) => <FmsSettings {...props}/>
    },

];

export function filterConfigByPerms(_treeConfig, perms) {
    let config = [];

    for (let c of _treeConfig) {
        if (c.children) {
            let childConfig = filterConfigByPerms(c.children, perms);
            if (childConfig.length > 0) config.push(c);
        } else if (c.required && perms.indexOf(c.required) !== -1) {
            config.push(c);
        } else if (!c.required) {
            config.push(c);
        }
    }

    return config;
}

export default treeConfig;

export const flatConfig = flatStructure(treeConfig);