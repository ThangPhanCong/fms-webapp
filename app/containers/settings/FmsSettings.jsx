import React from 'react';
import FmsPageTitle from '../../commons/page-title/FmsPageTitle';
import FmsSpin from '../../commons/FmsSpin/FmsSpin';
import PageApi from '../../api/PagesApi';

class FmsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: null
        }
    }

    componentWillMount() {
        PageApi.getPages()
            .then(pages => {
                this.setState({all: pages});
            })
            .catch(err => {
                alert(err.message);
            })
    }

    renderShopPages() {
        if (this.state.all && this.props.project && Array.isArray(this.props.project.pages)) {
            return this.props.project.pages.map(page => {
                return <div className="page-item-setting" key={page.fb_id}>{page.name}</div>
            });
        } else {
            return <div className="spin-wrapper"><FmsSpin size={27}/></div>
        }
    }

    renderOtherPages() {
        if (this.state.all && this.props.project && Array.isArray(this.props.project.pages)) {
            let pages = this.props.project.pages;
            let filtered = this.state.all.filter(page => {
                let same = pages.filter(p => p.fb_id === page.fb_id);
                return same.length === 0 && !page.is_active;
            });
            return filtered.map(page => {
                return <div className="page-item-setting" key={page.fb_id}>{page.name}</div>
            })
        } else {
            return <div className="spin-wrapper"><FmsSpin size={27}/></div>
        }
    }

    render() {
        if (!this.props.project) return <div/>;
        let alias = (this.props.project) ? this.props.project.alias : null;
        let route = (alias) ? `${alias}/Quản lý trang/Cài đặt` : "";
        return (
            <div className="settings">
                <FmsPageTitle title="Cài đặt" route={route}/>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Các trang thuộc cửa hàng</h5>
                                </div>
                                <div>
                                    <div className="ibox-content no-padding border-left-right">
                                        {this.renderShopPages()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Các trang chưa được kích hoạt</h5>
                                </div>
                                <div>
                                    <div className="ibox-content no-padding border-left-right">
                                        {this.renderOtherPages()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="delete-shop">
                                <div>Xóa cửa hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsSettings;
