const initState = {
    notes: [],
    orders: []
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
        default:
            return state;
    }
};

export default createOrder;