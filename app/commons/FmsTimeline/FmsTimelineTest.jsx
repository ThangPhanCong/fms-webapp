import React from 'react';
import FmsTimeline from './FmsTimeline.jsx';

const items = [
    {
        myClass: "older-event",
        dataDate: "16/01",
        desc: "Đang vận chuyển"
    },
    {
        myClass: "older-event",
        dataDate: "28/02",
        desc: "Lưu bưu cục"
    },
    {
        myClass: "older-event",
        dataDate: "01/03",
        desc: "Chưa phát được"
    },
    {
        myClass: "selected",
        dataDate: "12/03",
        desc: "Đã đến bưu cục"
    }
];
 
export default class FmsTimelineTest extends React.Component {
    render() {
        return (
            <div>
                <FmsTimeline items={items} />
            </div>
        );
    }
}
