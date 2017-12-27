import React from 'react';
import propTypes from 'prop-types';

class FmsPageTitle extends React.Component {
    render() {
        const {title, route} = this.props;

        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>{title}</h2>
                    <ol className="breadcrumb">
                        {
                            route.split('/').map(
                                (r, i, all) => {
                                    if (i !== all.length - 1) {
                                        return <li key={i}><a>{r}</a></li>
                                    } else {
                                        return <li key={i} className="active"><strong>{r}</strong></li>
                                    }
                                }
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

FmsPageTitle.propTypes = {
    title: propTypes.string.isRequired,
    route: propTypes.string.isRequired
};

export default FmsPageTitle;