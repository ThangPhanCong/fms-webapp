'use strict';

import React from 'react';
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import uuid from 'uuid';

import FmsSettingItem from 'FmsSettingItem';
import FmsTagItem from 'FmsTagItem';
import tagApi from 'TagApi';
import {MAX_TAG_ITEMS} from 'constant';

const TAG_COLORS = ['red', 'black', 'green', 'yellow', 'blue', 'gray'];

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
        <Row bsClass="settings-wrapper">
          <Col xs={12} sm={6}>
            <Row>
              <Col>
                <Checkbox >Notification sound</Checkbox>
              </Col>
              <Col>
                <Checkbox >Show unread conversation on top</Checkbox>
              </Col>
              <Col>
                <Checkbox >Auto like comment when replying</Checkbox>
              </Col>
              <Col>
                <Checkbox>Auto create new order</Checkbox>
              </Col>
              <Col>
                <Checkbox>Auto hide comment</Checkbox>
              </Col>
            </Row>
          </Col>

          <Col xs={12} sm={6}>
            <span>Thẻ hội thoại</span><span className="count-item">{countItem}</span>
            <Button disabled={self.state.tags.length == MAX_TAG_ITEMS || self.state.isLoading}
              onClick={() => {self.addNewTag('black', "new tag")}}>Thêm</Button>
            {self.renderTags()}
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = FmsSettings;
