import environments from 'environments/environment';

const INITIAL_DATA = {
    shop_id: environments.shop_id || '',
    searchShopsByItems: [],
    searchShopsByName: []
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onSelectedShopId':
            return {
                ...state,
                shop_id: action.payload
            }
        case 'onSearchShopsByItems':
            return {
                ...state,
                searchShopsByItems: action.payload
            }
        case 'onSearchShopsByName':
            return {
                ...state,
                searchShopsByName: action.payload
            }
        default:
            return state;
    }
}