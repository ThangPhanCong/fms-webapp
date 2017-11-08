import React from 'react';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {MAX_TAG_ITEMS, TAG_COLORS} from '../../constants/utils';
import FmsTagItem from './FmsTagItem';
import {getTags, addNewTag, updateTag, deleteTag} from '../../actions/setting';
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
class FmsTag extends React.Component {
  componentDidMount() {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(getTags(project_alias));
  }
  updateTag(tag) {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(updateTag(project_alias, tag));
  }
  deleteTag(tag) {
    const {project_alias} = this.props.match.params;
    const {dispatch} = this.props;
    dispatch(deleteTag(project_alias, tag));
  }
  addNewTag(color, name) {
    const {project_alias} = this.props.match.params;
    const {dispatch, tags} = this.props;
    let remainingColors = TAG_COLORS.filter(c => {
      let _tag = tags.find(t => t.color == c)
      return !_tag;
    })

    color = remainingColors.pop();
    dispatch(addNewTag(project_alias, color, name));
  }

  renderTags() {
    let self = this;
    let {tags, isSettingLoading} = this.props;

    return tags.map(tag => {
      return (<FmsTagItem key={tag._id} {...tag} updateTag={this.updateTag.bind(this)} deleteTag={this.deleteTag.bind(this)} isLoading={isSettingLoading}></FmsTagItem>)
    })
  }
  render() {
    let self = this;
    let {tags, isSettingLoading} = this.props;
    let countItem = `(${tags.length}/${MAX_TAG_ITEMS})`
    return (
        <div className="fms-block">
          <Row className="fms-block-header">
            <Col>
              <span>Thẻ hội thoại</span>
              <span>{countItem}</span>
              <a href="#" className="pull-right" disabled={tags.length == MAX_TAG_ITEMS || isSettingLoading} onClick={() => {
                  this.addNewTag('black', "new tag")
                }}>
                <span className="glyphicon glyphicon-plus"></span>
              </a>
            </Col>
          </Row>
          <Row>
            {this.renderTags()}
          </Row>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {isSettingLoading: state.setting.isSettingLoading, tags: state.setting.tags}
}

export default withRouter(connect(mapStateToProps)(FmsTag));
