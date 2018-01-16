import React, {Component} from 'react';
import propTypes from 'prop-types';

class FmsNoteInfoPanel extends Component {

    onChangeInput(refName) {
        const newValue = this.refs[refName].value;
        const {
            onChangeInput
        } = this.props;

        onChangeInput(refName, newValue);
    }

    render() {
        const {private_note} = this.props;

        return (
            <div className="form-group">
                <div className='row'>
                    <div className="col-sm-3">
                        <label className="control-label">Ghi chú nội bộ</label>
                    </div>
                    <div className="col-sm-9">
                        <input className="form-control"
                               type='text'
                               ref='private_note'
                               value={private_note || ''}
                               onChange={() => {
                                   this.onChangeInput('private_note')
                               }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

FmsNoteInfoPanel.propTypes = {
    private_note: propTypes.string,
    onChangeInput: propTypes.func
};

export default FmsNoteInfoPanel;