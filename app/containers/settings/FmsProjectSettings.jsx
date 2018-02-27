import React from 'react';
import FmsPageTitle from "../../commons/page-title/FmsPageTitle";

class FmsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            isEdittingName: false,
            isHandling: false
        }
    }

    onChangeName() {
        let name = this.refs.shopName.value;
        this.setState({name});
    }

    saveShopName() {
        if (this.state.isHandling) return;
        let rename = confirm("Bạn có chắc muốn đổi tên cửa hàng?");
        if (rename) {
            let name = this.refs.shopName.value;
            this.setState({isHandling: true});

        }
        this.setState({isEdittingName: false});
    }

    render() {
        if (!this.props.project) return <div/>;
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Cài đặt chung` : "";

        let shopName = typeof(this.state.name) === "string" ? this.state.name : (alias || "");
        return (
            <div>
                <FmsPageTitle title="Cài đặt chung" route={route}/>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label className="control-label shop-name">
                                    <span>Tên cửa hàng</span>
                                    {this.state.isEdittingName ?
                                        <div className="clickable" onClick={this.saveShopName.bind(this)}>Lưu</div>
                                        :
                                        <div className="clickable" onClick={() => {
                                            this.setState({isEdittingName: true});
                                        }}>Sửa</div>
                                    }
                                </label>
                                <input type="text" className="form-control" value={shopName} ref="shopName"
                                       onChange={this.onChangeName.bind(this)}
                                disabled={!this.state.isEdittingName}/>
                            </div>
                        </div>
                        <div className="col-sm-4"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsSettings;