import DashboardApi from '../../../api/DashboardApi';

export const createNote = (content, noti) => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let { alias } = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  DashboardApi.createNote(alias, conversation.id, customer_id, conversation.page._id, content)
    .then(res => {
      noti("success", "Tạo ghi chú thành công.");
      dispatch(getNotes());
    }, err => {
      noti("danger", "Tạo ghi chú thất bại.");
    });
}

export const getNotes = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let { alias } = getState().dashboard.conversations;
  DashboardApi.getNotes(alias, conversation.id)
    .then(res => {
      res.sort((a, b) => {return a.updated_time < b.updated_time});
      dispatch({ type: 'SET_NOTES', notes: res});
    }, err => {
      console.log(err);
    });
}
