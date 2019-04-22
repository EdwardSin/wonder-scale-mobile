import _ from 'lodash';

const INITIAL_DATA = {
    message: '',
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onToast':
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}