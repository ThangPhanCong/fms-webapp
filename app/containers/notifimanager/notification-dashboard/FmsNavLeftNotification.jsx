import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class FmsNavLeftNotification extends Component {
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

    componentWillMount() {
        switch (window.location.pathname) {
            case "/notifications/archived":
                this.setState({
                    focus_tab: false
                });
                break;
            case "/notifications":
                this.setState({
                    focus_tab: true
                });
                break;
        }
    }

    render() {
        const {focus_tab} = this.state;

        return (
            <div className="col-sm-2" style={{paddingLeft: "61px"}}>
                <ul className="navbar-noti">
                    <Link to="/notifications"
                          onClick={() => this.onChangeTabAll()}
                    >
                        <li className="nav-tab" style={focus_tab ? {
                            color: "#18A689",
                            fontWeight: "bold",
                            borderLeft: "solid"
                        } : {color: "black"}}>Thông báo
                        </li>
                    </Link>

                    <Link to="/notifications/archived"
                          onClick={() => this.onChangeTabArchived()}>
                        <li className="nav-tab-archive" style={!focus_tab ? {
                            color: "#18A689",
                            fontWeight: "bold",
                            paddingLeft: "6px",
                            borderLeft: "solid"
                        } : {color: "black"}}>Lưu trữ
                        </li>
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

export default connect(mapStateToProps)(FmsNavLeftNotification);