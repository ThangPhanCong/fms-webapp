'use strict';

const React = require('react');
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FmsSettingItem from 'FmsSettingItem';
import FmsTagItem from 'FmsTagItem';
import uuid from 'uuid';

const MAX_TAG_ITEMS = 12;

let FmsSettings = React.createClass({
  getInitialState: function () {
    return {
      tags: [{
        id: uuid(),
        name: 'Kiểm hàng',
        color: 'black'
      },
      {
        id: uuid(),
        name: 'Câu hỏi',
        color: 'yellow'
      },
      {
        id: uuid(),
        name: 'Mua hàng',
        color: 'red'
      },
      {
        id: uuid(),
        name: 'Đã gửi',
        color: 'cyan'
      },
      {
        id: uuid(),
        name: 'Hết hàng',
        color: 'blue'
      },
      {
        id: uuid(),
        name: 'Trả hàng',
        color: 'green'
      }]
    }
  },
  updateTag: function (tag) {
    console.log('update Tag', tag);
    let self = this;

    let tags = this.state.tags;
    let filterTags = tags.map(t => (t.id == tag.id) ? tag : t);

    this.setState({tags: filterTags});
  },
  deleteTag: function (tag) {
    console.log('deleteTag Tag', tag);
    let self = this;

    let tags = this.state.tags;
    let filterTags = tags.filter(t => t.id != tag.id);

    this.setState({tags: filterTags});
  },
  addNewTag: function (color, name) {
    let newTag = {
      id: uuid(),
      name, color
    }

    let tags = this.state.tags;
    tags.push(newTag);

    this.setState({tags: tags});
  },
  renderTags: function () {
    let self = this;

    let tags = self.state.tags;

    return tags.map(tag => {
      return (
        <FmsTagItem key={tag.id} {...tag} updateTag={self.updateTag} deleteTag={self.deleteTag}></FmsTagItem>
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
                <FmsSettingItem ></FmsSettingItem>
              </Col>
              <Col>
                <FmsSettingItem ></FmsSettingItem>
              </Col>
              <Col>
                <FmsSettingItem ></FmsSettingItem>
              </Col>
            </Row>
          </Col>

          <Col xs={12} sm={6}>
            <span>Thẻ hội thoại</span><span className="count-item">{countItem}</span><Button onClick={() => {self.addNewTag('black', "new tag")}}>Thêm</Button>
            {self.renderTags()}
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = FmsSettings;
