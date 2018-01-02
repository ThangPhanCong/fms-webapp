import React from 'react';

class FmsTabHeader extends React.Component {

    renderTabItems(titles) {
        const {tabActive, onSelectTab} = this.props;

        return titles.map(
            (title, i) => {
                if (typeof title === 'string') {
                    return (
                        <li key={i} className={tabActive === i ? 'active' : ''}>
                            <a onClick={() => onSelectTab(i)}>{title}</a>
                        </li>
                    )
                } else {
                    return <li key={i}>{title}</li>;
                }
            }
        )
    }

    render() {
        const {titles} = this.props;

        return (
            <ul className="nav nav-tabs">
                {
                    this.renderTabItems(titles)
                }
            </ul>
        )
    }
}

export default FmsTabHeader;