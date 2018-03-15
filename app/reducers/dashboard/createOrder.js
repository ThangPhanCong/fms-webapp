const initState = {
    notes: [],
    orders: [],
    reports: []
};

const createOrder = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.notes
            };
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.orders
            };
        case 'SET_REPORTS':
            return {
                ...state,
                reports: action.reports
            };
        default:
            return state;
    }
};

export default createOrder;