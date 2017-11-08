import React from 'react';
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';

import FmsSettingItem from './FmsSettingItem';
import FmsTagItem from './FmsTagItem';
import {connect} from 'react-redux';
import {MAX_TAG_ITEMS, TAG_COLORS} from '../../constants/utils';
import {getTags, addNewTag, updateTag, deleteTag } from '../../actions/setting';

class FmsSettings extends React.Component {
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

    return (<Grid bsClass="page">
      <Row bsClass="settings-wrapper row">
        <Col xs={12} sm={4}>
          <div className="fms-block">
            <Row className="fms-block-header">
              <Col>
                General settings
              </Col>
            </Row>
            <Row>
              <Col>
                <Checkbox className='tag-item-wrapper'>Notification sound</Checkbox>
              </Col>
              <Col>
                <Checkbox className='tag-item-wrapper'>Show unread conversation on top</Checkbox>
              </Col>
              <Col>
                <Checkbox className='tag-item-wrapper'>Auto like comment when replying</Checkbox>
              </Col>
              <Col>
                <Checkbox className='tag-item-wrapper'>Auto create new order</Checkbox>
              </Col>
              <Col>
                <Checkbox className='tag-item-wrapper'>Auto hide comment</Checkbox>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={12} sm={4}>
          <div className="fms-block">
            <Row className="fms-block-header">
              <Col>
                <span>Thẻ hội thoại</span>
                <span className="count-item">{countItem}</span>
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
        </Col>

      </Row>
    </Grid>);
  }
}

const mapStateToProps = state => {
  return {isSettingLoading: state.setting.isSettingLoading, tags: state.setting.tags}
}

export default connect(mapStateToProps)(FmsSettings);
