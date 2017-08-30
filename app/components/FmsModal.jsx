var React = require('react');
var FmsPageItemInModal = require('FmsPageItemInModal');
var Modal = require('react-bootstrap').Modal;
var PagesAPI = require('PagesAPI');

var pages = [];

var FmsModal = React.createClass({
    getInitialState: function () {
        return {
            isShown: false,
            buttonIsActive: true
        }
    },
    handleActiveButton: function () {
        var that = this;
        if (pages.length == 0) return;
        this.setState({ buttonIsActive: false });
        pages.map(function (page) {
            if (page.is_active) {
                PagesAPI.activePage(page.fb_id, function () {
                    that.props.updatePages();
                    that.close();
                });
            }
        });
        pages = [];
    },
    handleClickOnPageInModal: function (isSelected, id) {
        var inactive = this.props.inactive;
        var hasPageSelected = false;
        inactive.map(function (page) {
            if (page.fb_id == id) {
                page.is_active = isSelected;
                if (isSelected) hasPageSelected = true;
            }
        });
        // if (hasPageSelected) this.setState({ buttonIsActive: true});
        // else this.setState({ buttonIsActive: false });
        pages = inactive;
    },
    renderPagesInModal() {
        var that = this;
        var pages = this.props.inactive;
        if (pages.length == 0) {
            return <p>All your pages is active. Nothing to show!</p>
        }
        return pages.map(function (page) {
            return <FmsPageItemInModal data={page} key={page.fb_id} onPageClick={that.handleClickOnPageInModal}/>
        });
    },
    open: function () {
        this.setState({isShown: true});
    },
    close: function () {
        this.setState({isShown: false});
    },
    render: function () {
        var isActive, handleActiveButton;
        if (this.props.inactive.length > 0 && this.state.buttonIsActive) {
            isActive = ""; handleActiveButton = this.handleActiveButton;
        } else {
            isActive = " disabled"; handleActiveButton = "";
        }
        return (
            <Modal show={this.state.isShown} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose pages to active</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderPagesInModal()}
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className={"btn btn-primary" + isActive} onClick={handleActiveButton}>Active</button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = FmsModal;