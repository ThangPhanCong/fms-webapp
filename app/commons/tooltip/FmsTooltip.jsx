import React, {Component} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

class FmsTooltip extends Component {
    render() {
        const {position, text_tooltip} = this.props;

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>{text_tooltip}</strong>
            </Tooltip>
        );

        return(
            <OverlayTrigger placement={position} overlay={tooltip}>
                {this.props.children}
            </OverlayTrigger>
        )
    }
}

export default FmsTooltip;