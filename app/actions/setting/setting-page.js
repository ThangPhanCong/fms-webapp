import ProjectApi from '../../api/ProjectApi';
import PagesApi from '../../api/PagesApi';
import * as socket from '../../socket';

export const IS_SHOW_MODAL = 'IS_SHOW_MODAL';
export const SET_SELECTED_PAGES_MODAL = 'SET_SELECTED_PAGES_MODAL';
export const START_SENDING_REQUEST = 'START_SENDING_REQUEST';
export const COMPLETE_SENDING_REQUEST = 'COMPLETE_SENDING_REQUEST';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const PAGES_LOADED = 'PAGES_LOADED';
export const PAGES_MODAL_LOADED = 'PAGES_MODAL_LOADED';
export const RESET_MODAL_STATE = 'RESET_MODAL_STATE';
export const RESET_PAGES = 'RESET_PAGES';
export const PAGES_LOADING = 'PAGES_LOADING';

export const pagesLoading = () => dispatch => {
  dispatch({type: PAGES_LOADING})
};
export const isShowModal = () => dispatch => {
  dispatch({type: IS_SHOW_MODAL});
  dispatch({type: RESET_MODAL_STATE});
};

export const setSelectedPagesModal = (selectedPagesModal) => dispatch => {
  dispatch({type: SET_SELECTED_PAGES_MODAL, selectedPagesModal});
};

export const startSendingRequest = () => dispatch => {
  dispatch({
    type: START_SENDING_REQUEST
  });
};

export const completeSendingRequest = () => dispatch => {
  dispatch({
    type: COMPLETE_SENDING_REQUEST
  });
};

export const setLoadingStatus = () => dispatch => {
  dispatch({
    type: SET_LOADING_STATUS
  });
};

export const pagesLoaded = (pages) => dispatch => {
  dispatch({
    type: PAGES_LOADED,
    pages
  })
};

export const pagesModalLoaded = (pagesModal) => dispatch => {
  dispatch({
    type: PAGES_MODAL_LOADED,
    pagesModal
  })
};

export const resetModalState = () => dispatch => {
  dispatch({
    type: RESET_MODAL_STATE,
    pagesModal
  })
};
export const resetPages = () => dispatch => {
  dispatch({type: RESET_PAGES})
};
export const getPagesProject = (project_alias) => dispatch => {
  dispatch(pagesLoading());
  let pagesProject = [], allPages = [];
  ProjectApi.getProject(project_alias)
    .then(data => {
      if (data) {
        pagesProject = data.pages;
        dispatch(pagesLoaded(data.pages));
        return PagesApi.getPages();
      }
    })
    .then(pages => {
      if (pages) {
        allPages = pages;
        let listpages = allPages.filter(page => {
          return (pagesProject.filter(childPage => {
            return childPage.fb_id === page.fb_id;
          }).length === 0)
        });
        dispatch(pagesModalLoaded(_.clone(listpages)));
      }

    })
};


export const selectPageModal = (is_selected, page_fb_id) => (dispatch, getState) => {
  let {
    selectedPagesModal,
    pagesModal
  } = getState().setting.settingPage;
  if (is_selected) {
    let selectedPage = pagesModal.filter((page) => {
      return page.fb_id === page_fb_id;
    }).pop();

    if (!selectedPagesModal) selectedPagesModal = [];
    selectedPagesModal.push(selectedPage);
  } else {
    selectedPagesModal = selectedPagesModal.filter(page => {
      return page.fb_id !== page_fb_id;
    })
  }
  dispatch(setSelectedPagesModal(_.clone(selectedPagesModal)));
};

export const deletePage = (project_alias, page_id) => dispatch => {
  ProjectApi.deletePage(project_alias, page_id)
    .then(data => {
      if (data) {
        dispatch(getPagesProject(project_alias));
      }
    })
};

let activePage = function (page) {
  if (!page) return;
  return new Promise((resolve, reject) => {
    const onUpdate = (data) => {
      let updateStatus = (status, i) => {
        const TIME_DELAY = 300;
        setTimeout(() => {
          dispatch(setLoadingStatus(status));
        }, i * TIME_DELAY);
      };
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
    };
    const onDone = (err, res) => {
      if (err) {
        reject(new Error(`Lỗi ${res.code}: ` + res.msg));
      } else {
        resolve();
      }
    };
    socket.activePage({
      page_fb_id: page.fb_id,
      onUpdate,
      onDone
    });
  });
};

export const activePages = (project_alias) => (dispatch, getState) => {
  let {selectedPagesModal} = getState().setting.settingPage;
  if (!selectedPagesModal || !Array.isArray(selectedPagesModal) || selectedPagesModal.length === 0) return;
  dispatch(startSendingRequest());
  let error;
  selectedPagesModal.reduce((total, page, index, arr) => {
    return total.then(() => {
      return activePage(page);
    })
      .then(() => {
        return ProjectApi.addPage(project_alias, page.fb_id);
      }, err => {
        error = err;
        console.log(err);
      })
      .then(() => {
        if (index === arr.length - 1) {
          dispatch(completeSendingRequest());
          dispatch(isShowModal());
          dispatch(getPagesProject(project_alias));
        }
      });
  }, Promise.resolve());
};
