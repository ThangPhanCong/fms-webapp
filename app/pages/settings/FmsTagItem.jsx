

import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

class FmsTagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isEditting: false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  updateTag(tag) {
    let _tag = _.clone(tag);
    _tag.name = this.state.value;

    console.log('_tag', _tag);
    this.props.updateTag(_tag);
  }

  deleteTag(tag) {
    let _tag = _.clone(tag);

    this.props.deleteTag(_tag);
  }

  componentDidMount() {
    this.setState({ value: this.props.name });
  }

  render() {
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
                  onChange={this.handleChange} />
              </FormGroup>
            </form>
            : null
        }
        <div className='pull-right'>
          <Button onClick={() => { self.props.deleteTag(self.props) }}
            disabled={self.props.isLoading}><span className="glyphicon glyphicon-trash"></span></Button>
          <Button onClick={() => { self.setState({ isEditting: !isEditting }); if (isEditting) self.updateTag(self.props) }}
            disabled={self.props.isLoading}>{isEditting ? "Xong" : "Chỉnh sửa"}</Button>
        </div>
      </div>
    );
  }
}

module.exports = FmsTagItem;
