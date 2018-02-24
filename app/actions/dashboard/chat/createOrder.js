import NoteApi from '../../../api/NoteApi';
import {getOrders} from '../../../api/OrderApi';
import ReportApi from '../../../api/ReportApi';
import {noti} from "../../../containers/notification/NotificationService";
import utils from '../../../helpers/utils';

export const setOrders = (orders) => dispatch => {
    dispatch({type: 'SET_ORDERS', orders});
};

export const setReports = (reports) => dispatch => {
    dispatch({type: 'SET_REPORTS', reports});
};

export const createNote = (alias, content) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {notes} = getState().dashboard.createOrder;
    let customer_id = utils.parseCustomer(conversation, "_id");

    NoteApi.createNote(alias, conversation.id, customer_id, conversation.page._id, content)
        .then((res) => {
            noti("success", "Tạo ghi chú thành công.");
            notes.unshift(res);
            dispatch({type: 'SET_NOTES', notes: [...notes]});
        }, () => {
            noti("danger", "Tạo ghi chú thất bại.");
        });
};

export const getNotes = (alias) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    NoteApi.getNotes(alias, conversation.id)
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

export const deleteNote = (alias, note_id) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {notes} = getState().dashboard.createOrder;
    NoteApi.deleteNote(alias, conversation.id, note_id)
        .then(() => {
            noti("success", "Đã xóa một ghi chú.");
            let newNotes = notes.filter(note => {
                return note._id !== note_id;
            });
            dispatch({type: 'SET_NOTES', notes: newNotes});
        }, err => {
            console.log(err);
        });
};

export const updateNote = (alias, note_id, content) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {notes} = getState().dashboard.createOrder;
    NoteApi.updateNote(alias, conversation.id, note_id, content)
        .then(res => {
            noti("success", "Đã cập nhật một ghi chú.");
            let newNotes = notes.map(note => {
                if (note._id !== note_id) return note;
                else return res;
            });
            dispatch({type: 'SET_NOTES', notes: newNotes});
        }, err => {
            console.log(err);
        });
};

export const getAllOrders = (alias) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let customer_id = utils.parseCustomer(conversation, "_id");
    if (!customer_id) return;
    getOrders(alias, {customer_id})
        .then(res => {
            res.sort((a, b) => {
                let t1 = new Date(a.updated_time);
                let t2 = new Date(b.updated_time);
                return t2 - t1;
            });
            dispatch(setOrders(res));
        }, err => {
            console.log(err);
        });
};



export const createReport = (page_fb_id, content) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {reports} = getState().dashboard.createOrder;
    let customer_id = utils.parseCustomer(conversation, "fb_id");

    ReportApi.createReport(conversation.page_fb_id, customer_id, content)
        .then((res) => {
            noti("success", "Đã báo xấu thành công.");
            reports.unshift(res);
            dispatch(setReports([...reports]));
        }, () => {
            noti("danger", "Báo xấu thất bại.");
        });
};

export const getReports = () => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let customer_id = utils.parseCustomer(conversation, "fb_id");
    if (!customer_id) return;
    ReportApi.getReports(customer_id)
        .then(res => {
            res.sort((a, b) => {
                let t1 = new Date(a.updated_time);
                let t2 = new Date(b.updated_time);
                return t2 - t1;
            });
            dispatch(setReports(res));
        }, err => {
            console.log(err);
        });
};

export const deleteReport = (report_id) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {reports} = getState().dashboard.createOrder;
    let customer_id = utils.parseCustomer(conversation, "fb_id");
    if (!customer_id) return;
    ReportApi.deleteReport(customer_id, report_id)
        .then(() => {
            noti("success", "Đã xóa một báo xấu.");
            let newReports = reports.filter(report => {
                return report._id !== report_id;
            });
            dispatch(setReports(newReports));
        }, err => {
            console.log(err);
        });
};

export const updateReport = (report_id, content) => (dispatch, getState) => {
    let {conversation} = getState().dashboard.chat;
    let {reports} = getState().dashboard.createOrder;
    let customer_id = utils.parseCustomer(conversation, "fb_id");
    if (!customer_id) return;
    ReportApi.updateReport(customer_id, report_id, content)
        .then(res => {
            noti("success", "Đã cập nhật một báo xấu.");
            let newReports = reports.map(report => {
                if (report._id !== report_id) return report;
                else return res;
            });
            dispatch(setReports(newReports));
        }, err => {
            console.log(err);
        });
};