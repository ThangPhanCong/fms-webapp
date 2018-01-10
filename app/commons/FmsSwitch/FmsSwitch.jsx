import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    className: PropTypes.string
};

const defaultProps = {
    enabled: true,
    className: '',
    onDisabledClick: () => {}
};

class FmsSwitch extends React.Component {
    render() {
        const {on, onClick, onDisabledClick, enabled, className, children} = this.props;
        const classes = ['switch', className, (on ? 'on ' : ''), (enabled ? '' : 'disabled ')].join(' ');
        return (
            <div className={classes} onClick={(e) => enabled ? onClick(e) : onDisabledClick(e)}>
                <div className="switch-toggle" children={children}></div>
            </div>
        )
    }
}

FmsSwitch.propTypes = propTypes;
FmsSwitch.defaultProps = defaultProps;

export default FmsSwitch;
