import React from 'react';

import FmsActivePageModal from 'FmsActivePageModal';
import FmsPageItem from 'FmsPageItem';
import PagesAPI from 'PagesApi';

class FmsPageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      inactive: []
    }
    this.updatePages = this.updatePages.bind(this);
    this.handleClickOnPage = this.handleClickOnPage.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  updatePages(pages) {
    let self = this;
    PagesAPI.getPages().then(function (_pages) {
      self.setState({ active: _pages.active, inactive: _pages.inactive });
    }, function (err) {
      throw new Error(err);
    })
  }
  handleClickOnPage(data) {
    let id = data.fb_id;
    // browserHistory.push('/' + id);
  }
  renderPages() {
    let that = this;
    let pages = this.state.active;
    return pages.map(function (page) {
      return <FmsPageItem data={page} key={page.fb_id} onPageClick={that.handleClickOnPage}></FmsPageItem>
    });
  }
  componentDidMount() {
    this.updatePages();
  }
  openModal() {
    this._child.open();
  }
  render() {
    return (
      <div className="dashboard-border">
        <div className="div-list-page">
          {this.renderPages()}
        </div>
        <div className="div-active-button">
          <div className="description-active-button">Click Active button to view all available pages and active new pages</div>
          <button className="active-button" className="button" onClick={this.openModal}>Choose Pages</button>
        </div>

        <FmsActivePageModal ref={(child) => {
          this._child = child;
        }} inactive={this.state.inactive} updatePages={this.updatePages} />
      </div>
    );
  }
}

module.exports = FmsPageList;
