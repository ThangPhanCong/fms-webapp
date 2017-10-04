const React = require('react');
const {browserHistory} = require('react-router');
const _ = require('lodash');

const Modal = require('react-bootstrap').Modal;
const FmsPageItemInModal = require('FmsPageItemInModal');
const FmsSpin = require('FmsSpin');
const projectApi = require('ProjectApi');
const pagesApi = require('PagesApi');

const socket = require('Socket');

const PAGE_STATUS = {
  CREATE_PROJECT: 1,
  ACTIVE_PAGE: 2
}

let INIT_STATE = {
  isShown: false,
  pageStatus: PAGE_STATUS.CREATE_PROJECT,
  isSendingRequest: false,
  project: null,
  pages: null,
  selectedPages: null,
  loadingStatus: ''
};

let FmsAddProjectModal = React.createClass({
  getInitialState: function () {
		return _.clone(INIT_STATE);
	},
  open: function () {
    this.setState({isShown: true});
  },
  close: function () {
    // refresh all state
    this.props.updateProjects();
    this.setState(_.clone(INIT_STATE));
  },
  requestNewProject: function () {
    let self = this;
    let projectName = this.refs.projectName.value;

    if (!projectName) {
      alert('Project name is not allow to empty');
      return;
    }

    this.setState({
      isSendingRequest: true
    });

    projectApi.createNewProject(projectName)
      .then(newProject => {
        console.log('newProject', newProject);

        self.setState({
          isSendingRequest: false,
          pageStatus: PAGE_STATUS.ACTIVE_PAGE,
          project: newProject
        });

        self.updatePages();
      })
      .catch(err => {
        alert(err.message);

        self.setState({
          isSendingRequest: false
        });
      });
  },
  updatePages: function () {
    let self = this;

    pagesApi.getPages()
      .then(pages => {
        self.setState({pages});
      })
      .catch(err => {
        alert(err.message);
      })
  },
  // addPageToProject: function (projectAlias, page_id) {
  //   return projectApi.addPage(projectAlias, page_id);
  // },
  renderCreateNewProject: function () {
    let self = this;
    let disabled = this.state.isSendingRequest;

    return (
      <div className="add-project-modal">
        <Modal.Header closeButton={!disabled}>
          <Modal.Title>Choose pages to active</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="project-name">Project name:</label>
            <input type="project-name" className="form-control" ref="projectName" id="project-name"></input>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button type="button" className={"btn btn-primary active-btn"} onClick={self.requestNewProject} disabled={disabled}>Create new Project</button>
        </Modal.Footer>
      </div>
    )
  },
  handleClickOnPageInModal: function (isSelected, page_fb_id) {
    let selectedPages = this.state.selectedPages;
    let pages = this.state.pages;
    if (isSelected) {
      let selectedPage = pages.filter((page) => {
        return page.fb_id == page_fb_id;
      }).pop();

      if (!selectedPages) selectedPages = [];
      selectedPages.push(selectedPage);
    } else {
      selectedPages = selectedPages.filter(page => {
        return page.fb_id != page_fb_id;
      })
    }

    this.setState({selectedPages: selectedPages});
  },
  renderPageItems: function () {
    let self = this;
    let pages = this.state.pages;

    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(page => {
        // let isSelected = self.state.selectedPage && self.state.selectedPage.fb_id == page.fb_id
        //   && !self.state.selectedPage;
        let isSelected = self.state.selectedPages && (self.state.selectedPages.filter(_page => {
          return _page.fb_id == page.fb_id;
        }).length > 0);
        let canSelect = !self.state.isSendingRequest;

        return (
          <FmsPageItemInModal data={page} key={page.fb_id}
            onPageClick={self.handleClickOnPageInModal} isSelected={isSelected} canSelect={canSelect}/>
        )
      })
    } else {
      return (
        <div>Bạn không có page nào!</div>
      )
    }
  },
  activePages: function () {
    let self = this;
    let project = this.state.project;
    let selectedPages = this.state.selectedPages;

    if (!selectedPages || !Array.isArray(selectedPages) || selectedPages.length == 0) return;

    this.setState({isSendingRequest: true});

    console.log('selectedPages', selectedPages);
    //alert(`Lỗi ${res.code}: ` + res.msg);
    let error;
    selectedPages.reduce((total, page, index, arr) => {
      return total.then(() => self.activePage(page))
        .then(() => {
          // add page active to project
          return projectApi.addPage(project.alias, page.fb_id);
        }, err => {
          error = err;
          console.log(err);
        })
        .then(() => {
          if (index == arr.length - 1) {
            console.log('index ', index);
            this.setState({isSendingRequest: false});
            if (error) alert(error);

            self.close();
          }
        });
    }, Promise.resolve());

  },
  activePage: function (page) {
    let self = this;
		if (!page) return;

    return new Promise((resolve, reject) => {
      let onUpdate = (data) => {
  			console.log('onUpdate', data);

  			let updateStatus = (status, i) => {
  				const TIME_DELAY = 300; // miliseconds

  				setTimeout(() => {
  					self.setState({loadingStatus : status});
  				}, i * TIME_DELAY);
  			}

  			switch(data.type) {
  				case 'inbox':
  					let users = data.items;

  					users.forEach((user, index) => {
  						let _loadingStatus = 'Lấy hội thoại người dùng: ' + user;
  						updateStatus(_loadingStatus, index);
  					});

  					break;
  				case 'post':
  					let titles = data.items;

  					titles.map(title => {
  						if (!title) return '';
  						return (title.length > 39) ? (title.substring(0, 37) + '...') : title;
  					})
  					.forEach((title, index) => {
  						let _loadingStatus = 'Lấy nội dung bài đăng: ' + title;
  						updateStatus(_loadingStatus, index);
  					});
  					break;
  			}
  		};

  		let onDone = (err, res) => {
  			console.log('onDone', res);
  			if (err) {
          reject(new Error(`Lỗi ${res.code}: ` + res.msg));
  			} else {
          resolve();
        }

  			// self.props.updatePages();
  			// self.close();
  		};

  		socket.activePage({
  			page_fb_id: page.fb_id,
  			onUpdate,
  			onDone
  		});
    });
  },
  renderActivePages: function () {
    let self = this;
    let disabled = this.state.isSendingRequest;
    let selectedPages = this.state.selectedPages;
    let loadingStatus = '' + (this.state.loadingStatus || '');
		let statusHidden = this.state.isSendingRequest ? ' ' : ' fms-hidden';

    return (
      <div className="add-project-modal">
        <Modal.Header closeButton={!disabled}>
          <Modal.Title>Chọn page thêm vào project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {self.renderPageItems()}
        </Modal.Body>
        <Modal.Footer>
          <div className="pagemodal-footer-wrapper">
            <div className={"status " + statusHidden}>
              <FmsSpin size={34}></FmsSpin>
              <p className="text-status">{loadingStatus}</p>
            </div>
            <button type="button" className={"btn btn-primary active-btn"}
              disabled={this.state.isDisabled}
              disabled={disabled || !selectedPages || !Array.isArray(selectedPages) || selectedPages.length == 0}
              onClick={self.activePages}>Active</button>
          </div>
        </Modal.Footer>
      </div>
    )
  },
  renderBodyModal: function () {
    let self = this;
    let pageStatus = this.state.pageStatus;

    if (pageStatus == PAGE_STATUS.CREATE_PROJECT) {
      return self.renderCreateNewProject();
    } else if (pageStatus == PAGE_STATUS.ACTIVE_PAGE) {
      return self.renderActivePages();
    }
  },
  render: function() {
    let self = this;

    return (
      <Modal show={this.state.isShown} onHide={this.close} backdrop='static' keyboard={false} >
        {self.renderBodyModal()}
      </Modal>
    );
  }
});

module.exports = FmsAddProjectModal;
