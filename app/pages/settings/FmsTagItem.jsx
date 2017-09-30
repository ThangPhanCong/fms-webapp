'use strict';

const React = require('react');
import {Grid, Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import _ from 'lodash';

let FmsTagItem = React.createClass({
  getInitialState() {
    return {
      value: '',
      isEditting: false
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  updateTag: function (tag) {
    let _tag = _.clone(tag);
    _tag.name = this.state.value;

    console.log('_tag', _tag);
    this.props.updateTag(_tag);
  },

  deleteTag: function (tag) {
    let _tag = _.clone(tag);

    this.props.deleteTag(_tag);
  },

  componentDidMount: function () {
    this.setState({value: this.props.name});
  },

  render: function() {
    let self = this;
    let isEditting = self.state.isEditting;

    let colorItemStyle = {
      backgroundColor: self.props.color
    }

    return (
      <div className="tag-item-wrapper">
        <span className="color-preview" style={colorItemStyle}></span>
        {
          isEditting ? null : <span className="tag-name">{self.props.name}</span>
        }
        {
          isEditting ?
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}>
              <FormControl
                type="text"
                value={this.state.value}
                onChange={this.handleChange}/>
            </FormGroup>
          </form>
          : null
        }
        <Button onClick={() => {self.props.deleteTag(self.props)}}>Xóa</Button>
        <Button onClick={() => {self.setState({isEditting: !isEditting}); if (isEditting) self.updateTag(self.props)}}>{isEditting ? "Xong" : "Chỉnh sửa"}</Button>
      </div>
    );
  }
});

module.exports = FmsTagItem;
