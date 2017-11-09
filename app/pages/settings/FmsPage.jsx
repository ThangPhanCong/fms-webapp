import React from 'react';
import { Grid, Row, Col, Checkbox, Button } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getPages} from "../../actions/setting";

class FmsPage extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getPages(project_alias));
  }
  renderPages() {
    const {dispatch, pages} = this.props;
    return pages.map(function (page) {
      let avaUrl = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;
      return (<div className="page-item">
        <img src={avaUrl} className="page-profile" />
        <span className="fanpage-title">{page.name}</span>
      </div>)
    });
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
            <Button>Thêm trang</Button>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pages: state.setting.pages
  }
}
export default withRouter(connect(mapStateToProps)(FmsPage));
