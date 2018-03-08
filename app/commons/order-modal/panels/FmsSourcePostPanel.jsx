import React, {Component} from 'react';
import FmsEditableDropdown from "../../editable-dropdown/FmsEditableDropdown";

class FmsSourcePostPanel extends Component {

    onChangeSource(newValue) {
        this.props.onChangeInput('source', newValue);
    }

    onSelectSource(index) {
        this.props.onChangeInput('source', this.props.posts[index]);
    }

    render() {
        return (
            <div className="form-group">
                <div className='row'>
                    <div className="col-sm-3">
                        <label className="control-label">Nguồn bài viết</label>
                    </div>
                    <div className="col-sm-9">
                        <FmsEditableDropdown items={this.props.posts}
                                             value={this.props.source || ''}
                                             onSearchChange={this.onChangeSource.bind(this)}
                                             noItemNoti="Không tìm thấy nguồn bài viết nào"
                                             onSelectItem={this.onSelectSource.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsSourcePostPanel;