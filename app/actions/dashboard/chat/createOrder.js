import DashboardApi from '../../../api/DashboardApi';

export const createNote = (content, noti) => (dispatch, getState) => {
  let { alias } = getState().dashboard.conversations;
  let conversation = getState().dashboard.chat.conversation;
  console.log(getState().dashboard.chat);
  DashboardApi.createNote(alias, conversation._id, conversation.type,
      conversation.customer._id, conversation.page._id, content)
    .then(res => {
      noti("success", "Tạo ghi chú thành công.");
    }, err => {
      noti("danger", "Tạo ghi chú thất bại.");
    });
}
