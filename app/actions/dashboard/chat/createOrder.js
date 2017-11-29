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
    }, err => {
      noti("danger", "Tạo ghi chú thất bại.");
    });
}

export const getNotes = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  DashboardApi.getNotes(conversation.id)
    .then(res => {
      dispatch({ type: 'SET_NOTES', notes: res});
    }, err => {
      console.log(err);
    });
}
