import OrderApi from '../../../api/OrderApi';

export const createNote = (content, noti) => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  OrderApi.createNote(alias, conversation.id, customer_id, conversation.page._id, content)
    .then(() => {
      noti("success", "Tạo ghi chú thành công.");
      dispatch(getNotes());
    }, () => {
      noti("danger", "Tạo ghi chú thất bại.");
    });
};

export const getNotes = () => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  OrderApi.getNotes(alias, conversation.id)
    .then(res => {
      res.sort((a, b) => {
        return a.updated_time < b.updated_time
      });
      dispatch({type: 'SET_NOTES', notes: res});
    }, err => {
      console.log(err);
    });
};

export const createNewOrder = (phone, address, noti) => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  let payload = {
    phone: phone,
    address: address,
    page_fb_id: conversation.page_fb_id
  };
  OrderApi.createOrder(alias, customer_id, payload)
    .then(() => {
      noti("success", "Tạo đơn hàng thành công.");
      dispatch(getOrders());
    }, err => {
      console.log(err);
      noti("danger", "Tạo đơn hàng thất bại.");
    });
};

export const getOrders = () => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  OrderApi.getOrders(alias, customer_id, conversation.page_fb_id)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
};