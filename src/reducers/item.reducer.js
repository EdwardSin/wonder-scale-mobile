
const INITIAL_DATA = {
    isRefreshItem: true,
    scrollTo: 0,
    items: [],
    visible: false
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'refreshItem':
            return {
                ...state,
                isRefreshItem: true
            }
        case 'doneRefreshItem':
            return {
                ...state,
                items: action.payload,
                isRefreshItem: false
            }
        case 'scrollToItem':
            return {
                ...state,
                scrollTo: action.payload
            }
        default:
            return state;
    }
}