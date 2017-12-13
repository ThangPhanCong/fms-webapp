const initState = {
  notes: []
};

const createOrder = (state = initState, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.notes
      };
    default:
      return state;
  }
};

export default createOrder;