import React from 'react';

class FmsColorCardItem extends React.Component {
    render() {
        let style = {backgroundColor: this.props.data.color, color: "white"};
        return (
            <tr onClick={() => {this.props.onClick(this.props.data)}} className="color-card-item">
                <td>{this.props.index}</td>
                <td className="color-tag">
                    <span className="label" style={style}>&nbsp;</span>
                </td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.description || "Thêm ghi chú của bạn"}</td>
                <td className="color-tag">
                    <span className="label tag-label" style={style}>{this.props.data.name}</span>
                </td>
            </tr>
        )
    }
}

export default FmsColorCardItem;