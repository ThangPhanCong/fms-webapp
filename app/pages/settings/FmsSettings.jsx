'use strict';

const React = require('react');
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import FmsSettingItem from 'FmsSettingItem';
import FmsTagItem from 'FmsTagItem';
import uuid from 'uuid';

import tagApi from 'TagApi';

const MAX_TAG_ITEMS = 6;
const TAG_COLORS = ['#F44336', '#009688', '#4CAF50', '#795548', '#1976D2', '#607D8B'];

let FmsSettings = React.createClass({
  getInitialState: function () {
    return {
      tags: []
    }
  },
  updateTag: function (tag) {
    let self = this;
    let projectAlias = this.props.params.alias;

    tagApi.update(projectAlias, tag._id, tag.name, tag.color)
      .then(updatedTag => {
        let tags = this.state.tags;
        let filterTags = tags.map(t => (t._id == tag._id) ? updatedTag : t);

        self.setState({tags: filterTags});
      })
  },
  deleteTag: function (tag) {
    let self = this;
    let projectAlias = this.props.params.alias;

    tagApi.remove(projectAlias, tag._id)
      .then(() => {
        let tags = self.state.tags;
        let filterTags = tags.filter(t => t._id != tag._id);

        self.setState({tags: filterTags});
      })
  },
  addNewTag: function (color, name) {
    let self = this;
    let projectAlias = this.props.params.alias;

    let remainingColors = TAG_COLORS.filter(c => {
      let _tag = self.state.tags.find(t => t.color == c)
      return !_tag;
    })

    color = remainingColors.pop();

    tagApi.create(projectAlias, name, color)
      .then(newTag => {
        let tags = self.state.tags;
        tags.push(newTag);

        self.setState({tags: tags});
      })
      .catch(err => alert(err.message));
  },
  componentDidMount: function () {
    let self = this;
    let projectAlias = this.props.params.alias;

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
        <FmsTagItem key={tag._id} {...tag} updateTag={self.updateTag} deleteTag={self.deleteTag}></FmsTagItem>
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
                <Checkbox checked={true}>Notification sound</Checkbox>
              </Col>
              <Col>
                <Checkbox checked={true}>Show unread conversation on top</Checkbox>
              </Col>
              <Col>
                <Checkbox checked={true}>Auto like comment when replying</Checkbox>
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
            <span>Thẻ hội thoại</span><span className="count-item">{countItem}</span><Button disabled={self.state.tags.length == MAX_TAG_ITEMS} onClick={() => {self.addNewTag('black', "new tag")}}>Thêm</Button>
            {self.renderTags()}
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = FmsSettings;
