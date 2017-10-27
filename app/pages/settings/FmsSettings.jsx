import React from 'react';
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';

import FmsSettingItem from 'FmsSettingItem';
import FmsTagItem from 'FmsTagItem';
import tagApi from 'TagApi';
import {MAX_TAG_ITEMS} from '../../constants/utils';

const TAG_COLORS = ['#795548', '#30499B', '#844D9E', '#009688', '#88C542', '#F57C00'];

let FmsSettings = React.createClass({
  getInitialState: function () {
    return {
      tags: [],
      isLoading: false
    }
  },
  updateTag: function (tag) {
    let self = this;
    let projectAlias = this.props.match.params.project_alias;

    self.setState({isLoading: true});

    tagApi.update(projectAlias, tag._id, tag.name, tag.color)
      .then(updatedTag => {
        let tags = this.state.tags;
        let filterTags = tags.map(t => (t._id == tag._id) ? updatedTag : t);

        self.setState({tags: filterTags, isLoading: false});
      })
  },
  deleteTag: function (tag) {
    let self = this;
    let projectAlias = this.props.match.params.project_alias;

    self.setState({isLoading: true});

    tagApi.remove(projectAlias, tag._id)
      .then(() => {
        let tags = self.state.tags;
        let filterTags = tags.filter(t => t._id != tag._id);

        self.setState({tags: filterTags, isLoading: false});
      })
  },
  addNewTag: function (color, name) {
    let self = this;
    let projectAlias = this.props.match.params.project_alias;

    self.setState({isLoading: true});

    let remainingColors = TAG_COLORS.filter(c => {
      let _tag = self.state.tags.find(t => t.color == c)
      return !_tag;
    })

    color = remainingColors.pop();

    tagApi.create(projectAlias, name, color)
      .then(newTag => {
        let tags = self.state.tags;
        tags.push(newTag);

        self.setState({tags: tags, isLoading: false});
      })
      .catch(err => alert(err.message));
  },
  componentDidMount: function () {
    let self = this;
    let projectAlias = this.props.match.params.project_alias;

    tagApi.getProjectTags(projectAlias)
      .then(tags => {
        self.setState({ tags })
      })
  },
  renderTags: function () {
    let self = this;
    let tags = self.state.tags;

    return tags.map(tag => {
      return (
        <FmsTagItem key={tag._id} {...tag} updateTag={self.updateTag}
          deleteTag={self.deleteTag} isLoading={self.state.isLoading}></FmsTagItem>
      )
    })
  },
  render: function() {
    let self = this;
    let countItem = `(${self.state.tags.length}/${MAX_TAG_ITEMS})`

    return (
      <Grid bsClass="page">
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
                  <span>Thẻ hội thoại</span><span className="count-item">{countItem}</span>
                  <a href="#" className="pull-right" disabled={self.state.tags.length == MAX_TAG_ITEMS || self.state.isLoading}
                    onClick={() => {self.addNewTag('black', "new tag")}}><span className="glyphicon glyphicon-plus"></span></a>
                </Col>
              </Row>
              <Row>
              {self.renderTags()}
              </Row>
            </div>
          </Col>

        </Row>
      </Grid>
    );
  }
});

module.exports = FmsSettings;
