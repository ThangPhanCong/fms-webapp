import DashboardApi from '../../../api/DashboardApi';

export const createNote = (content, noti) => (dispatch, getState) => {
  let conversation = getState().dashboard.chat.conversation;
  if (conversation.page_fb_id == conversation.from.fb_id) {
    alert("Không thể tạo ghi chú cho chính mình.");
    return;
  }
  DashboardApi.createNote(conversation.id, conversation.customer._id, conversation.page._id, content)
    .then(res => {
      noti("success", "Tạo ghi chú thành công.");
      dispatch(getNotes());
    }, err => {
      noti("danger", "Tạo ghi chú thất bại.");
    });
}

export const getNotes = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  DashboardApi.getNotes(conversation.id)
    .then(res => {
      res.sort((a, b) => {return a.updated_time < b.updated_time});
      dispatch({ type: 'SET_NOTES', notes: res});
    }, err => {
      console.log(err);
    });
}
