import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class NavLeftNotification extends Component {
    state = {
        focus_tab: true
    };

    onChangeTabAll() {
        this.setState({
            focus_tab: true
        })
    }

    onChangeTabArchived() {
        this.setState({
            focus_tab: false
        })
    }

    render() {
        const {focus_tab} = this.state;

        return (
            <div className="col-sm-2" style={{paddingLeft: "61px"}}>
                <ul className="navbar-noti">
                    <Link to="/notifications"
                          onClick={() => this.onChangeTabAll()}
                          style={focus_tab ? {color: "#18A689", fontWeight: "bold"} : {color: "black"}}>
                        <li>Thông báo (781)</li>
                    </Link>
                    <Link to="/notifications/archived"
                          onClick={() => this.onChangeTabArchived()}
                          style={!focus_tab ? {color: "#18A689", fontWeight: "bold"} : {color: "black"}}>
                        <li>Lưu trữ</li>
                    </Link>
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

const FmsNavLeftNotification = connect(mapStateToProps)(NavLeftNotification)

export default FmsNavLeftNotification;