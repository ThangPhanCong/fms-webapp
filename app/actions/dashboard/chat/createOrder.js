import OrderApi from '../../../api/OrderApi';

export const createNote = (content, noti) => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  let {notes} = getState().dashboard.createOrder;
  let customer_id = (conversation.customer) ? conversation.customer._id : null;
  OrderApi.createNote(alias, conversation.id, customer_id, conversation.page._id, content)
    .then((res) => {
      //noti("success", "Tạo ghi chú thành công.");
      notes.unshift(res);
      dispatch({type: 'SET_NOTES', notes});
    }, () => {
      //noti("danger", "Tạo ghi chú thất bại.");
    });
};

export const getNotes = () => (dispatch, getState) => {
  let {conversation} = getState().dashboard.chat;
  let {alias} = getState().dashboard.conversations;
  OrderApi.getNotes(alias, conversation.id)
    .then(res => {
      res.sort((a, b) => {
        let t1 = new Date(a.updated_time);
        let t2 = new Date(b.updated_time);
        return t2 - t1;
      });
      dispatch({type: 'SET_NOTES', notes: res});
    }, err => {
      console.log(err);
    });
};

export const deleteNote = (note_id, noti) => (dispatch, getState) => {
  let {alias} = getState().dashboard.conversations;
  let {conversation} = getState().dashboard.chat;
  let {notes} = getState().dashboard.createOrder;
  OrderApi.deleteNote(alias, conversation.id, note_id)
    .then(() => {
      //noti("success", "Đã xóa một ghi chú.");
      let newNotes = notes.filter(note => {
        return note._id !== note_id;
      });
      dispatch({type: 'SET_NOTES', notes: newNotes});
    }, err => {
      console.log(err);
    });
};

export const updateNote = (note_id, content, noti) => (dispatch, getState) => {
  let {alias} = getState().dashboard.conversations;
  let {conversation} = getState().dashboard.chat;
  let {notes} = getState().dashboard.createOrder;
  OrderApi.updateNote(alias, conversation.id, note_id, content)
    .then(res => {
      //noti("success", "Đã cập nhật một ghi chú.");
      let newNotes = notes.map(note => {
        if (note._id !== note_id) return note;
        else return res;
      });
      dispatch({type: 'SET_NOTES', notes: newNotes});
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
      //noti("success", "Tạo đơn hàng thành công.");
      dispatch(getOrders());
    }, err => {
      console.log(err);
      //noti("danger", "Tạo đơn hàng thất bại.");
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