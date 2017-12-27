import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {isShowModal, deletePage, getPagesProject,resetPages} from "../../../actions/setting/setting-page";
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import FmsPageModal from './FmsPageModal';
import FmsPageInProject from './FmsPageInProject';

class FmsPage extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(resetPages());
    dispatch(getPagesProject(project_alias));
  }

  openModal() {
    const {dispatch} = this.props;
    dispatch(isShowModal());
  }


  renderPages() {
    const {pages, isPagesLoading} = this.props;
    if (isPagesLoading) {
      return (
        <FmsSpin size={25}/>
      )
    } else {
      if (Array.isArray(pages) && pages.length > 0) {
        return pages.map(page => {
          return (
            <FmsPageInProject data={page} key={page.fb_id}/>
          )
        })
      } else {
        return (
          <div>Bạn không có trang nào!</div>
        )
      }
    }

  }

  render() {
    const {isPagesLoading} = this.props;
    return (
      <div className="fms-block fms-page">
        <Row className="setting-header">
          <Col>
            Danh sách trang của dự án
          </Col>
        </Row>
        {this.renderPages()}
        {(isPagesLoading) ? null :
          <Button className="button-common" onClick={this.openModal.bind(this)}>Thêm trang</Button>}
        <FmsPageModal/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.setting.settingPage.pages,
    isShowModal: state.setting.settingPage.isShowModal,
    isPagesLoading: state.setting.settingPage.isPagesLoading
  }
};
export default withRouter(connect(mapStateToProps)(FmsPage));