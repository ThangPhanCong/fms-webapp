import React, { Component } from 'react';
import FmsContact from './FmsContact';

const staff = {
    avatar: '',
    roleName: 'Graphics designer',
    fullName: 'Nguyễn Văn A',
    userName: 'nguyen_van_a',
    email: 'nguyenvana@example.com',
    address: '144 Xuân Thủy, Cầu Giấy',
    dateOfBirth: '1998-03-12',
    phone: '0912345678'
}

class FmsContactTest extends Component {
    handleClick(data) {
        console.log(data);
    }
    render() {
        return (
            <div className='col-md-4'>
                <FmsContact 
                    data={staff}     
                    handleClick={this.handleClick}
                />
            </div>
        );
    }
}

export default FmsContactTest;
