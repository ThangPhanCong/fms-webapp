import pageApi from '../api/PagesApi';

export const PAGES_LOADING = 'PAGES_LOADING';
export const PAGES_LOADED = 'PAGES_LOADED';

export const getPages = () => dispatch => {
  dispatch({
    type: PAGES_LOADING
  });
  pageApi.getPages()
    .then(pages => {
      dispatch({
        type: PAGES_LOADED,
        pages
      })
    })
    .catch(err => {
      dispatch({
        type: PAGES_LOADED,
        pages: []
      });
      console.log(err);
    })
};
