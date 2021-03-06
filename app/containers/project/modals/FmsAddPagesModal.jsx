import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import propTypes from 'prop-types';
import FmsPageItem from './FmsPageItem';
import FmsSpin from '../../../commons/FmsSpin/FmsSpin';
import projectApi from '../../../api/ProjectApi';
import pagesApi from '../../../api/PagesApi';

class FmsAddPagesModal extends Component {
    constructor() {
        super();
        this.state = {
            selectedPages: []
        }
    }

    onCloseBtnClick() {
        const {onClose} = this.props;
        onClose(this.state.selectedPages);
        this.setState({
            selectedPages: []
        })
    }

    selectPage(page) {
        const {selectedPages} = this.state;
        const _selectedPages = [...selectedPages];
        _selectedPages.push(page);
        this.setState({
            selectedPages: _selectedPages
        })
    }

    unSelectPage(page) {
        const {selectedPages} = this.state;
        this.setState({
            selectedPages: selectedPages.filter(_page => _page.fb_id !== page.fb_id)
        })
    }

    renderPageItems() {
        const {pages, isLoading} = this.props;
        const {selectedPages} = this.state;
        if (!isLoading) {
            if (pages.length !== 0) {
                return pages.map(page => {
                    const isSelected = !!(selectedPages.find(_page => _page.fb_id === page.fb_id));
                    return (
                        <FmsPageItem
                            data={page}
                            key={page.fb_id}
                            isSelected={isSelected}
                            canSelect={true}
                            onSelect={this.selectPage.bind(this)}
                            onUnSelect={this.unSelectPage.bind(this)}
                        />
                    )
                })
            } else {
                return (
                    <div>Không tìm thấy trang</div>
                )
            }
        } else {
            return (
                <div className="spinner-in-middle"><FmsSpin size={25}/></div>
            )
        }
    }

    render() {
        const {
            isShown,
            isLoading,
            onClose,
            projectName
        } = this.props;
        let loadingStatus = '' + (this.props.loadingStatus || '');
        let statusHidden = this.props.isSendingRequest ? ' ' : ' fms-hidden';

        return (
            <Modal
                show={isShown}
                onHide={() => {
                    this.setState({selectedPages: []});
                    onClose()
                }}
                backdrop='static' keyboard={false}
            >

               <div className='inmodal'>
                   <Modal.Header closeButton={!isLoading}>
                       <Modal.Title>Thêm trang Facebook cho cửa hàng <br/> <strong>{projectName}</strong></Modal.Title>
                   </Modal.Header>

                   <Modal.Body>
                       {this.renderPageItems()}
                   </Modal.Body>

                   <Modal.Footer>
                       <div className="pagemodal-footer-wrapper">
                           <div className={"status " + statusHidden}>
                               <FmsSpin size={34}/>
                               <p className="text-status">{loadingStatus}</p>
                           </div>
                           <button type="button"
                                   className={"btn btn-primary active-btn"}
                                   onClick={this.onCloseBtnClick.bind(this)}
                                   disabled={this.state.selectedPages.length === 0}
                           >Thêm
                           </button>
                       </div>
                   </Modal.Footer>
               </div>

            </Modal>
        );
    }
}

FmsAddPagesModal.propTypes = {
    pages: propTypes.array.isRequired,
    isShown: propTypes.bool.isRequired,
    isLoading: propTypes.bool,
    onClose: propTypes.func.isRequired,
    projectName: propTypes.string
};

export default FmsAddPagesModal;
