import React, {Component} from 'react';
import propTypes from 'prop-types';
import {getOrderTags} from "../../../api/OrderTagApi";

class FmsOrderTagInfoPanel extends Component {

    state = {
        orderTags: []
    };

    getOrderTags(project) {
        getOrderTags(project.alias)
            .then(
                orderTags => {
                    const noneTag = {_id: 'none', name: ''};
                    orderTags.unshift(noneTag);
                    this.setState({orderTags});
                },
                err => {
                    alert(err.message)
                }
            )
            .catch(err => alert(err.message));
    }

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    componentDidMount() {
        const {project} = this.props;

        if (project) {
            this.getOrderTags(project);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isShown && nextProps.isShown) {
            this.getOrderTags(nextProps.project);
        }
    }

    render() {
        const {order_tag, disabled} = this.props;
        const {orderTags} = this.state;

        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-sm-3">
                        <label className="control-label">Đánh dấu</label>
                    </div>
                    <div className="col-sm-9 color-tag">
                        <select className="form-control"
                                ref='order_tag'
                                value={
                                    ((order_tag) => {
                                        if (typeof order_tag === 'string') {
                                            return order_tag;
                                        } else if (order_tag) {
                                            return order_tag._id;
                                        } else {
                                            return '';
                                        }
                                    })(order_tag)
                                }
                                onChange={() => {
                                    this.onChangeInput('order_tag')
                                }}
                                disabled={disabled}
                        >
                            {
                                orderTags.map(
                                    (tag, i) => (
                                        <option key={i} value={tag._id}>{tag.name}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

FmsOrderTagInfoPanel.propTypes = {
    project: propTypes.object,
    order_tag: propTypes.any,
    onChangeInput: propTypes.func,
    disabled: propTypes.bool
};

export default FmsOrderTagInfoPanel;