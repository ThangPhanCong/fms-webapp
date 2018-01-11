import React from 'react';
import FmsPageTitle from '../../commons/page-title/FmsPageTitle';
import FmsSpin from '../../commons/FmsSpin/FmsSpin';
import PageApi from '../../api/PagesApi';
import ProjectApi from '../../api/ProjectApi';
import addImg from '../../assets/images/add.png';

class FmsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: null,
            isHandling: false
        }
    }

    getPages(){
        this.setState({all: null});
        PageApi.getPages()
            .then(pages => {
                this.setState({all: pages});
            })
            .catch(err => {
                alert(err.message);
            })
    }

    componentWillMount() {
        this.getPages();
    }

    deletePage(page_id) {
        let aloww = confirm("Bạn có chắc muốn xóa trang này khỏi cửa hàng?");
        if (aloww && !this.state.isHandling) {
            this.setState({isHandling: true});
            ProjectApi.deletePage(this.props.project.alias, page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isHandling: false});
                })
        }
    }

    addPage(page_id) {
        let aloww = confirm("Bạn có muốn thêm trang này vào cửa hàng?");
        if (aloww && !this.state.isHandling) {
            this.setState({isHandling: true});
            ProjectApi.addPage(this.props.project.alias, page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isHandling: false});
                })
        }
    }

    renderShopPages() {
        if (this.state.all && this.props.project && Array.isArray(this.props.project.pages)) {
            let disabled = (this.state.isHandling) ? " disabled" : "";
            return this.props.project.pages.map(page => {
                let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
                return <div className="page-item-setting" key={page.fb_id}>
                    <div className="avatar"><img className="avatar-image" src={avaUrl}/></div>
                    <div className="page-name">{page.name}</div>
                    <div className={"glyphicon glyphicon-trash delete-icon clickable" + disabled}
                         onClick={() => {this.deletePage(page._id)}}/>
                </div>
            });
        } else {
            return <div className="spin-wrapper padding"><FmsSpin size={27}/></div>
        }
    }

    renderOtherPages() {
        if (this.state.all && this.props.project && Array.isArray(this.props.project.pages)) {
            let pages = this.props.project.pages;
            let filtered = this.state.all.filter(page => {
                let same = pages.filter(p => p.fb_id === page.fb_id);
                return same.length === 0 && !page.is_active;
            });
            let disabled = (this.state.isHandling) ? " disabled" : "";
            return filtered.map(page => {
                let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
                return <div className="page-item-setting" key={page.fb_id}>
                    <div className="avatar"><img className="avatar-image" src={avaUrl}/></div>
                    <div className="page-name">{page.name}</div>
                    <img className={"add-icon clickable" + disabled} src={addImg}
                         onClick={() => {this.addPage(page._id)}}/>
                </div>
            })
        } else {
            return <div className="spin-wrapper padding"><FmsSpin size={27}/></div>
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
                                <div className="ibox-title title">
                                    Các trang thuộc cửa hàng
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
                                <div className="ibox-title title">
                                    Các trang chưa được kích hoạt
                                </div>
                                <div>
                                    <div className="ibox-content no-padding border-left-right">
                                        {this.renderOtherPages()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FmsSettings;
