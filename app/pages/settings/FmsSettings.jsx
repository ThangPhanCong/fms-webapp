import React from 'react';
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import FmsAnswer from './FmsAnswer';
import FmsCustomer from './FmsCustomer';
import FmsEmploy from './FmsEmploy';
import FmsGeneral from './FmsGeneral';
import FmsNoti from './FmsNoti';
import FmsPage from './FmsPage';
import FmsPay from './FmsPay';
import FmsPost from './FmsPost';
import FmsTag from './FmsTag';
import FmsSidebar from './FmsSidebar';
import {connect} from 'react-redux';

class FmsSettings extends React.Component {
  render() {
    return (<Grid bsClass="page">
      <Row bsClass="settings-wrapper row">
        <Col xs={12} sm={4}>
          <FmsSidebar/>
        </Col>
        <Col xs={12} sm={4}>
          <Switch>
            <Route path="/projects/:project_alias/settings/general" component={FmsGeneral}/>
            <Route path="/projects/:project_alias/settings/tag" component={FmsTag}/>
            <Route path="/projects/:project_alias/settings/page" component={FmsPage}/>
            <Route path="/projects/:project_alias/settings/post" component={FmsPost}/>
            <Route path="/projects/:project_alias/settings/customer" component={FmsCustomer}/>
            <Route path="/projects/:project_alias/settings/answer" component={FmsAnswer}/>
            <Route path="/projects/:project_alias/settings/employ" component={FmsEmploy}/>
            <Route path="/projects/:project_alias/settings/noti" component={FmsNoti}/>
            <Route path="/projects/:project_alias/settings/pay" component={FmsPay}/>
          </Switch>
        </Col>
      </Row>
    </Grid>);
  }
}

export default withRouter(connect()(FmsSettings));
