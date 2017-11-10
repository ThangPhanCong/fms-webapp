import React from 'react';
import { Grid, Row, Col, Checkbox, Button, Modal } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {isShowModal, deletePage, getPagesProject} from "../../../actions/setting/setting-page";
import FmsSpin from '../../../components/FmsSpin';
import FmsPageModal from './FmsPageModal';
import FmsPageInProject from './FmsPageInProject';

class FmsPage extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getPagesProject(project_alias));
  }
  openModal() {
    const {dispatch} = this.props;
    dispatch(isShowModal());
  }
  deletePage() {
    const {selectedPages, dispatch} = this.props;
      const {project_alias} = this.props.match.params;
    dispatch(deletePage(project_alias, selectedPages[0]._id));
  }
  renderPages() {
    const {pages, selectedPages} = this.props;
    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(page => {
        let isSelected = selectedPages && (selectedPages.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect = true;
        return (
          <FmsPageInProject data={page} key={page.fb_id} isSelected={isSelected} canSelect={canSelect} />
        )
      })
    } else {
      return (
        <div>Bạn không có trang nào!</div>
      )
    }
  }
  render() {
    const {selectedPages} = this.props;
    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Danh sách trang của dự án
            </Col>
          </Row>
            {this.renderPages()}
            <Button onClick={this.openModal.bind(this)}>Thêm trang</Button>
            <Button onClick={this.deletePage.bind(this)} disabled={(selectedPages.length == 0) ? true : false}>Xóa trang</Button>
            <FmsPageModal></FmsPageModal>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pages: state.setting.settingPage.pages,
    isSelected: state.setting.settingPage.isSelected,
    isShowModal: state.setting.settingPage.isShowModal,
    selectedPages: state.setting.settingPage.selectedPages
  }
}
export default withRouter(connect(mapStateToProps)(FmsPage));
