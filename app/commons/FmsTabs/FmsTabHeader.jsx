import React from 'react';

class FmsTabHeader extends React.Component {

    renderTabItems(titles) {
        const {tabActive, onSelectTab} = this.props;

        return titles.map(
            (title, i) => {
                if (typeof title === 'string') {
                    return (
                        <li key={i} className={tabActive === i ? 'active' : ''}>
                            <a onClick={() => onSelectTab(i)} className="dashboard-custom">{title}</a>
                        </li>
                    )
                } else if (typeof title === 'object' && title.props) {
                    return <li key={i}>{title}</li>;
                } else {
                    return (
                        <li key={i} className={tabActive === i ? 'active' : ''}>
                            <a onClick={() => onSelectTab(i)} className="dashboard-custom">
                                <i className={`${title.icon}`}/>
                                {title.content}
                            </a>
                        </li>
                    )
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