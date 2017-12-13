"use strict";

import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import {changeValueTag} from '../../actions/setting/setting-tag';
import {connect} from 'react-redux';

class FmsTagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditting: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getValidationState() {
    const length = this.props.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }
  handleChange(e) {
    const {dispatch} = this.props;
    dispatch(changeValueTag(e.target.value));
  }
  updateTag(tag) {
    let _tag = _.clone(tag);
    const {value} = this.props;
    _tag.name = value;
    this.props.updateTag(_tag);
  }

  deleteTag(tag) {
    let _tag = _.clone(tag);

    this.props.deleteTag(_tag);
  }

  render() {
    let self = this;
    let isEditting = self.state.isEditting;
    let colorItemStyle = {
      backgroundColor: self.props.color
    };
    const {value} = this.props;
    return (
      <div className="tag-item-wrapper">
        <span className="color-preview" style={colorItemStyle}/>
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
                  value={value}
                  onChange={this.handleChange} />
              </FormGroup>
            </form>
            : null
        }
        <div className='pull-right'>
          <Button onClick={() => { self.props.deleteTag(self.props) }}
            disabled={self.props.isLoading}><span className="glyphicon glyphicon-trash"/></Button>
          <Button onClick={() => { self.setState({ isEditting: !isEditting }); if (isEditting) self.updateTag(self.props) }}
            disabled={self.props.isLoading}>{isEditting ? "Xong" : "Chỉnh sửa"}</Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {value: state.setting.settingTag.value}
};

export default connect(mapStateToProps)(FmsTagItem);
