import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deletePage} from "../../../actions/setting/setting-page";
import FmsConfirm from "../../../commons/confirm-modal/FmsConfirm";

class FmsPageItemInModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isConfirmModalShown: false
    }
  }

  deletePage(isDelete) {
    const {data, dispatch} = this.props;
    const {project_alias} = this.props.match.params;
    if (isDelete) {
      dispatch(deletePage(project_alias, data._id));
      this.setState({
        isConfirmModalShown: false
      })
    }
  }

  isConfirmModalShown() {
    this.setState({isConfirmModalShown: true});
  }

  render() {
    let avaUrl = `https://graph.facebook.com/v2.10/${this.props.data.fb_id}/picture`;
    const content = "Bạn có chắc chắn muốn xóa trang này khỏi dự án không?";
    return (
      <div className={"page-item"}>
        <img src={avaUrl} className="page-profile"/>
        <span className="fanpage-title">{this.props.data.name}</span>
        <button className="delete-button" onClick={this.isConfirmModalShown.bind(this)}>
          <svg aria-hidden="true" className="octicon octicon-trashcan" height="16" version="1.1" viewBox="0 0 12 16"
               width="12">
            <path fillRule="evenodd" fill="red"
                  d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"/>
          </svg>
        </button>
        <FmsConfirm isShown={this.state.isConfirmModalShown} content={content} onClose={this.deletePage.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {}
};
export default withRouter(connect(mapStateToProps)(FmsPageItemInModal));
