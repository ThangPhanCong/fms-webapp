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
        const {disabled} = this.props;

        return (
            <div className="form-group">
                <div className='row'>
                    <div className="col-sm-3">
                        <label className="control-label">Nguồn bài viết (id)</label>
                    </div>
                    <div className="col-sm-9">
                        <FmsEditableDropdown
                            items={this.props.posts}
                            value={this.props.source || ''}
                            onSearchChange={this.onChangeSource.bind(this)}
                            noItemNoti="Không có nguồn bài viết để hiển thị"
                            onSelectItem={this.onSelectSource.bind(this)}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FmsSourcePostPanel;