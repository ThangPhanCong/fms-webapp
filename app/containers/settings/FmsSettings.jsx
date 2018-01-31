import React from 'react';
import FmsPageTitle from '../../commons/page-title/FmsPageTitle';
import FmsSpin from '../../commons/FmsSpin/FmsSpin';
import PageApi from '../../api/PagesApi';
import ProjectApi from '../../api/ProjectApi';
import addImg from '../../assets/images/add.png';
import * as socket from '../../socket/index';

class FmsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: null,
            pages: null,
            isHandling: false
        }
    }

    getPages() {
        this.setState({all: null});
        PageApi.getPages()
            .then(pages => {
                this.setState({all: pages});
            })
            .catch(err => {
                alert(err.message);
            })
    }

    getPagesOfProject(alias) {
        this.setState({pages: []});
        ProjectApi.getPages(alias)
            .then(res => {
                this.setState({pages: res.pages});
            })
            .catch(err => {
                alert(err.message);
            });
    }

    onGetHistorySuccess(res) {
        alert("Đã lấy lịch sử trang thành công.");
        this.unsubscribePageChanges(res.data.page_fb_id);
    }

    onGetHistoryFail(res) {
        alert("Lấy lịch sử thất bại");
        this.unsubscribePageChanges(res.data.page_fb_id);
    }

    subscribePagesChanges(pages) {
        pages.forEach(page => {
            if (page.is_crawling) {
                this.subscribePageChanges(page._id);
            }
        });
    }

    subscribePageChanges(page_id) {
        socket.subscribePagesChanges({
            page_id: page_id,
            onCrawlSuccess: this.onGetHistorySuccess.bind(this),
            onCrawlFail: this.onGetHistoryFail.bind(this)
        });
    }

    unsubscribePagesChanges(pages) {
        pages.forEach(page => {
            if (page.is_crawling) {
                this.unsubscribePageChanges(page._id);
            }
        });
    }

    unsubscribePageChanges(page_id) {
        socket.unsubscribePagesChanges({
            page_id: page_id
        });
    }

    componentWillMount() {
        this.getPages();
        if (this.props.project && this.props.project.alias) {
            this.getPagesOfProject(this.props.project.alias);
        }
    }

    componentDidUpdate(prevProps, prevStates) {
        if ((!prevProps.project && this.props.project) ||
            (prevProps.project && this.props.project && prevProps.project.alias !== this.props.project.alias)) {
            this.getPagesOfProject(this.props.project.alias);
        }
        if (this.state.pages && !prevStates.pages) {
            this.subscribePagesChanges(this.state.pages);
        }
    }

    componentWillUnmount() {
        if (Array.isArray(this.state.pages)) {
            this.unsubscribePagesChanges(this.state.pages);
        }
        socket.disconnect();
    }

    deletePage(page_id) {
        let aloww = confirm("Bạn có chắc muốn xóa trang này khỏi cửa hàng?");
        if (aloww && !this.state.isHandling) {
            this.setState({isHandling: true});
            ProjectApi.deletePage(this.props.project.alias, page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                    this.getPagesOfProject(this.props.project.alias);
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isHandling: false});
                })
        }
    }

    addPage(page_id) {
        let allow = confirm("Bạn có muốn thêm trang này vào cửa hàng?");
        if (allow && !this.state.isHandling) {
            let getHistory = confirm("Bạn có muốn lấy lịch sử của trang khi thêm vào cửa hàng?");
            if (getHistory) {
                this.subscribePageChanges(page_id);
                socket.getPageHistory({
                    page_id: page_id
                });
            }
            this.setState({isHandling: true});
            ProjectApi.addPage(this.props.project.alias, page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                    this.getPagesOfProject(this.props.project.alias);
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isHandling: false});
                })
        }
    }

    renderShopPages() {
        if (this.state.all && this.state.pages) {
            let disabled = (this.state.isHandling) ? " disabled" : "";
            return this.state.pages.map(page => {
                let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
                return <div className="page-item-setting" key={page.fb_id}>
                    <div className="avatar"><img className="avatar-image" src={avaUrl}/></div>
                    <div className="page-name">{page.name}</div>
                    <div className={"glyphicon glyphicon-trash delete-icon clickable" + disabled}
                         onClick={() => {
                             this.deletePage(page._id)
                         }}/>
                </div>
            });
        } else {
            return <div className="spin-wrapper padding"><FmsSpin size={27}/></div>
        }
    }

    renderOtherPages() {
        if (this.state.all && this.state.pages) {
            let pages = this.state.pages;
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
                         onClick={() => {
                             this.addPage(page._id)
                         }}/>
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
