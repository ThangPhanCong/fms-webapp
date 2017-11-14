import * as u from 'lodash';
import * as socket from '../../socket';
import pagesApi from '../../api/PagesApi';
import projectApi from '../../api/ProjectApi';
import { getProjects } from './project';


export const openModal = () => dispatch => {
  dispatch({ type: 'OPEN_MODAL' });
}
export const closeModal = () => dispatch => {
  dispatch(getProjects());
  dispatch({ type: 'RESET_MODAL_STATE' });
}
export const sendingRequest = (state) => dispatch => {
  dispatch({ type: 'SENDING_REQUEST', state });
}
export const setPages = (pages) => dispatch => {
  const sortedPages = pages.sort((page1, page2) => page1.name > page2.name);
  dispatch({ type: 'SET_LIST_PAGES', pages: sortedPages });
}
export const setSelectedPages = (pages) => dispatch => {
  dispatch({ type: 'SET_SELECTED_PAGES', selectedPages: pages });
}
export const setLoadingStatus = () => dispatch => {
  dispatch({ type: 'SET_LOADING_STATUS' });
}
export const createProjectSuccess = (projectName) => dispatch => {
  dispatch({ type: 'CREATE_PROJECT_SUCCESS', newProject: projectName });
}
export const resetModalState = () => dispatch => {
  dispatch({ type: 'RESET_MODAL_STATE' });
}

export const createNewProject = (projectName) => dispatch => {
  if (!projectName) {
    alert('Tên dự án không được để trống');
    return;
  }
  dispatch(sendingRequest(true));
  projectApi.createNewProject(projectName)
    .then(newProject => {
      dispatch(createProjectSuccess(projectName));
      dispatch(updatePages());
    })
    .catch(err => {
      alert(err.message);
      dispatch(sendingRequest(false));
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
  let { selectedPages, pages } = getState().project;
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
  dispatch(setSelectedPages(u.clone(selectedPages)));
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
  let project = getState().project.project;
  let selectedPages = getState().project.selectedPages;
  if (!selectedPages || !Array.isArray(selectedPages) || selectedPages.length == 0) return;
  dispatch(sendingRequest(true));
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
          dispatch(sendingRequest(false));
          dispatch(closeModal());
        }
      });
  }, Promise.resolve());
}
