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

export const createNewOrder = (phone, address, noti) => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let { alias } = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  let payload = {
    phone: phone,
    address: address,
    page_fb_id: conversation.page_fb_id
  }
  DashboardApi.createOrder(alias, customer_id, payload)
    .then(res => {
      noti("success", "Tạo đơn hàng thành công.");
      dispatch(getOrders());
    }, err => {
      console.log(err);
      noti("danger", "Tạo đơn hàng thất bại.");
    });
}

export const getOrders = () => (dispatch, getState) => {
  let { conversation } = getState().dashboard.chat;
  let { alias } = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  DashboardApi.getOrders(alias, customer_id, conversation.page_fb_id)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
}