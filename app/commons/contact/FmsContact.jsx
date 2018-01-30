import React, { Component } from 'react';
import propTypes from 'prop-types';
import User_Male from './image/User_Male.png';

class FmsContact extends Component {
    render() {
        const {data} = this.props;

        return (
            <div className="contact-box">
                <div className="col-sm-4">
                    <div className="text-center">
                        <a onClick={this.props.handleClick.bind(this, data)}>
                            <img alt="image" className="img-circle m-t-xs img-responsive" src={data.avatar || User_Male} />                        
                        </a>
                        <div className="m-t-xs font-bold">{data.roleName}</div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <h3><strong>{data.fullName}</strong></h3>
                    <p><i className="fa fa-map-marker"></i> {data.address}</p>
                    <address>
                        {/* <strong>{data.userName}</strong><br/>
                        <strong><a href={"mailto:" + data.email}>{data.email}</a></strong><br/> */}
                        Ngày sinh: <strong>{data.dateOfBirth}</strong><br/>
                        Điện thoại: <strong>{data.phone}</strong>
                    </address>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

FmsContact.propTypes = {
    data: propTypes.shape({
        avatar: propTypes.string,
        roleName: propTypes.string.isRequired,
        fullName: propTypes.string.isRequired,
        userName: propTypes.string.isRequired,
        email: propTypes.string,
        address: propTypes.string,
        dateOfBirth: propTypes.string,
        phone: propTypes.string,
    }),
    handleClick: propTypes.func
}

export default FmsContact;
