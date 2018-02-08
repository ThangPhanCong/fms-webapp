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
            states: null,
            isHandling: false
        }
    }

    getPages() {
        this.setState({all: null});
        PageApi.getPages()
            .then(res => {
                this.setState({all: res});
            })
            .catch(err => {
                alert(err.message);
            })
    }

    getPagesOfProject() {
        this.setState({pages: null});
        ProjectApi.getPages()
            .then(res => {
                this.setState({pages: res});
            })
            .catch(err => {
                alert(err.message);
            });
    }

    updatePageStatus(page_fb_id) {
        let pages = this.state.pages.map(page => {
            if (page.fb_id === page_fb_id) {
                page.is_crawling = false;
            }
            return page;
        });
        this.setState({pages: pages});
    }

    onGetHistorySuccess(res) {
        alert("Đã lấy lịch sử trang thành công.");
        let page_fb_id = res.data.page_fb_id;
        this.unsubscribePageChanges(page_fb_id);
        this.updatePageStatus(page_fb_id);
    }

    onGetHistoryFail(res) {
        alert("Lấy lịch sử thất bại");
        let page_fb_id = res.data.page_fb_id;
        this.unsubscribePageChanges(page_fb_id);
        this.updatePageStatus(page_fb_id);
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

    componentDidMount() {
        socket.connect(() => {
        });
        this.getPages();
        if (this.props.project) {
            this.getPagesOfProject();
        }
    }

    componentDidUpdate(prevProps, prevStates) {
        if ((!prevProps.project && this.props.project) || (prevProps.path !== this.props.path)) {
            this.getPagesOfProject();
        }
        if (this.state.pages && !prevStates.pages) {
            this.subscribePagesChanges(this.state.pages);
        }
        if (this.state.all && this.state.all !== prevStates.all) {
            let page_fb_ids = this.state.all.map(page => page.fb_id);
            ProjectApi.checkActivePage(page_fb_ids)
                .then(res => {
                    this.setState({states: res});
                }, err => {
                    console.log(err);
                });
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
            ProjectApi.deletePage(page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                    this.getPagesOfProject();
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
            // let getHistory = confirm("Bạn có muốn lấy lịch sử của trang khi thêm vào cửa hàng?");
            // if (getHistory) {
            //     this.subscribePageChanges(page_id);
            //     socket.getPageHistory({
            //         page_id: page_id
            //     });
            // }
            this.setState({isHandling: true});
            ProjectApi.addPage(page_id)
                .then(() => {
                    this.setState({isHandling: false});
                    this.getPages();
                    this.getPagesOfProject();
                })
                .catch(err => {
                    alert(err.message);
                    this.setState({isHandling: false});
                })
        }
    }

    renderShopPages() {
        if (this.state.all && this.state.pages && this.state.states) {
            let disabled = (this.state.isHandling) ? " disabled" : "";
            return this.state.pages.map(page => {
                let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
                let isCrawling = (page.is_crawling) ? " disabled" : "";
                return <div className={"page-item-setting" + isCrawling} key={page.fb_id}>
                    <div className="avatar"><img className="avatar-image" src={avaUrl}/></div>
                    <div className="page-name">{page.name}</div>
                    {!page.is_crawling ?
                        <div className={"glyphicon glyphicon-trash delete-icon clickable" + disabled}
                             onClick={() => {
                                 this.deletePage(page.fb_id)
                             }}/>
                        :
                        <div className="spin-wrapper padding"><FmsSpin size={27}/></div>
                    }
                </div>
            });
        } else {
            return <div className="spin-wrapper padding"><FmsSpin size={27}/></div>
        }
    }

    renderOtherPages(is_active) {
        if (this.state.all && this.state.pages && this.state.states) {
            let pages = this.state.pages;
            let filtered = this.state.all.filter(page => {
                let same = pages.filter(p => p.fb_id === page.fb_id);
                return same.length === 0 && this.state.states[page.fb_id] === is_active;
            });
            let disabled = (this.state.isHandling) ? " disabled" : "";
            return filtered.map(page => {
                let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
                return <div className="page-item-setting" key={page.fb_id}>
                    <div className="avatar"><img className="avatar-image" src={avaUrl}/></div>
                    <div className="page-name">{page.name}</div>
                    {!is_active ?
                        <img className={"add-icon clickable" + disabled} src={addImg}
                             onClick={() => {
                                 this.addPage(page.fb_id)
                             }}/>
                        :
                        null
                    }
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
                                        {this.renderOtherPages(false)}
                                    </div>
                                </div>
                            </div>
                            <div className="ibox float-e-margins">
                                <div className="ibox-title title">
                                    Các trang đã được kích hoạt ở cửa hàng khác
                                </div>
                                <div>
                                    <div className="ibox-content no-padding border-left-right">
                                        {this.renderOtherPages(true)}
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
