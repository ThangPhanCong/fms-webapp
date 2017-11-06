import _ from 'lodash';
import * as socket from '../../socket';
import pagesApi from '../../api/PagesApi';
import projectApi from '../../api/ProjectApi';
import { getProjects } from './project';


export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const START_SENDING_REQUEST = 'START_SENDING_REQUEST';
export const COMPLETE_SENDING_REQUEST = 'COMPLETE_SENDING_REQUEST';
export const SET_LIST_PAGES = 'SET_LIST_PAGES';
export const SET_SELECTED_PAGES = 'SET_SELECTED_PAGES';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const RESET_MODAL_STATE = 'RESET_MODAL_STATE';


////////////////////////////////////////////////////////////////////////////
export const openModal = () => dispatch => {
  dispatch({ type: OPEN_MODAL });
}
export const closeModal = () => dispatch => {
  dispatch(getProjects());
  dispatch({ type: RESET_MODAL_STATE });
}
export const startSendingRequest = () => dispatch => {
  dispatch({ type: START_SENDING_REQUEST });
}
export const completeSendingRequest = () => dispatch => {
  dispatch({ type: COMPLETE_SENDING_REQUEST });
}
export const setPages = (pages) => dispatch => {
  dispatch({ type: SET_LIST_PAGES, pages: pages });
}
export const setSelectedPages = (pages) => dispatch => {
  dispatch({ type: SET_SELECTED_PAGES, selectedPages: pages });
}
export const setLoadingStatus = () => dispatch => {
  dispatch({ type: SET_LOADING_STATUS });
}
export const createProjectSuccess = (projectName) => dispatch => {
  dispatch({ type: CREATE_PROJECT_SUCCESS, newProject: projectName });
}
export const resetModalState = () => dispatch => {
  dispatch({ type: RESET_MODAL_STATE });
}
/////////////////////////////////////////////////////////////////////////////////


export const createNewProject = (projectName) => dispatch => {
  if (!projectName) {
    alert('Project name is not allow to be empty');
    return;
  }
  dispatch(startSendingRequest());
  projectApi.createNewProject(projectName)
    .then(newProject => {
      dispatch(createProjectSuccess(projectName));
      dispatch(updatePages());
    })
    .catch(err => {
      alert(err.message);
      dispatch(completeSendingRequest());
    });
}

export const updatePages = () => dispatch => {
  pagesApi.getPages()
    .then(pages => {
      dispatch(setPages(pages));
    })
    .catch(err => {
      alert(err.message);
    })
}

export const clickOnPageInModal = (isSelected, page_fb_id) => (dispatch, getState) => {
  let { selectedPages, pages } = getState().project.projectModal;
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
  dispatch(setSelectedPages(_.clone(selectedPages)));
}

let activePage = function (page) {
  if (!page) return;
  return new Promise((resolve, reject) => {
    const onUpdate = (data) => {
      let updateStatus = (status, i) => {
        const TIME_DELAY = 300;
        setTimeout(() => {
          dispatch(setLoadingStatus(status));
        }, i * TIME_DELAY);
      }
      switch (data.type) {
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
    }
    const onDone = (err, res) => {
      if (err) {
        reject(new Error(`Lỗi ${res.code}: ` + res.msg));
      } else {
        resolve();
      }
    }
    socket.activePage({
      page_fb_id: page.fb_id,
      onUpdate,
      onDone
    });
  });
}

export const activePages = () => (dispatch, getState) => {
  let project = getState().project.projectModal.project;
  let selectedPages = getState().project.projectModal.selectedPages;
  if (!selectedPages || !Array.isArray(selectedPages) || selectedPages.length == 0) return;
  dispatch(startSendingRequest());
  let error;
  selectedPages.reduce((total, page, index, arr) => {
    return total.then(() => {
      return activePage(page);
    })
      .then(() => {
        return projectApi.addPage(project, page.fb_id);
      }, err => {
        error = err;
        console.log(err);
      })
      .then(() => {
        if (index == arr.length - 1) {
          dispatch(completeSendingRequest());
          dispatch(closeModal());
        }
      });
  }, Promise.resolve());
}