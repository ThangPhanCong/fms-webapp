import React from 'react';
import FmsTimeline from './FmsTimeline.jsx';

const items = [
    {
        content: "Đang nhận hàng",
        created_time: "2018-03-06 10:00",
        note : "Đang nhận hàng",
        class: 'status'
    },
    {
        content: "Đang giao hàng",
        created_time: "2018-03-06 10:00",
        note : "Đang giao hàng",
        class: 'status'
    },
    {
        content: "Lưu bưu cục",
        created_time: "2018-03-06 10:00",
        note : "Lưu bưu cục",
        class: 'shop_note'
    },
    {
        content: "Lưu bưu cục",
        created_time: "2018-03-06 10:00",
        note : "Giao lại vào 22h cho khách",
        class: 'status'
    },
    {
        content: "Lưu bưu cục",
        created_time: "2018-03-06 10:00",
        note : "Lưu bưu cục",
        class: 'shop_note'
    },
    {
        content: "Lưu bưu cục",
        created_time: "2018-03-06 10:00",
        note : "Giao lại vào 22h cho khách",
        class: 'status'
    }
];
 
export default class FmsTimelineTest extends React.Component {
    render() {
        return (
            <FmsTimeline items={items} />
        );
    }
}
