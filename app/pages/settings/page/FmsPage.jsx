import React from 'react';
import { Grid, Row, Col, Checkbox, Button, Modal } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getPagesProject, selectPage, isShowModal} from "../../../actions/setting";
import tickImg from '../../../images/tick.png';
import FmsSpin from '../../../components/FmsSpin';
import FmsPageModal from './FmsPageModal';
import FmsPageItemInModal from './FmsPageItemInModal';
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
  renderPages() {
    let self = this;
    const {pages, selectedPages} = this.props;
    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(page => {
        let isSelected = selectedPages && (selectedPages.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect =  true;

        return (
          <FmsPageItemInModal data={page} key={page.fb_id} isSelected={isSelected} canSelect={canSelect} />
        )
      })
    } else {
      return (
        <div>Bạn không có trang nào!</div>
      )
    }
  }
  render() {
    return (
        <div className="fms-block">
          <Row className="setting-header">
            <Col>
              Danh sách trang của dự án
            </Col>
          </Row>
            {this.renderPages()}
            <Button onClick={this.openModal.bind(this)}>Thêm trang</Button>
            <FmsPageModal></FmsPageModal>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pages: state.setting.pages,
    isSelected: state.setting.isSelected,
    isShowModal: state.setting.isShowModal,
    selectedPages: state.setting.selectedPages
  }
}
export default withRouter(connect(mapStateToProps)(FmsPage));
