import _ from 'lodash';
import environments from 'environments/environment';

const INITIAL_DATA = {
    shop_id: environments.shop_id || '',
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onSelectedShopId':
            return {
                ...state,
                shop_id: action.payload
            }
        default:
            return state;
    }
}