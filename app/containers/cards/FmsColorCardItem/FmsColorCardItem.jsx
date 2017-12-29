import React from 'react';

class FmsColorCardItem extends React.Component {
    render() {
        let style = {backgroundColor: this.props.data.color, color: "white"};
        return (
            <tr>
                <td>{this.props.index}</td>
                <td className="color-tag">
                    <span className="label" style={style}>&nbsp;</span>
                </td>
                <td>{this.props.data.name}</td>
                <td>Đánh dấu những đơn cần liên hệ lại cho khách</td>
                <td className="color-tag">
                    <span className="label tag-label" style={style}>{this.props.data.name}</span>
                </td>
            </tr>
        )
    }
}

export default FmsColorCardItem;