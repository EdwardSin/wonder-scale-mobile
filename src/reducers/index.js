import { combineReducers } from 'redux';
import itemReducer from './item.reducer';
import mapReducer from './map.reducer';
import shopReducer from './shop.reducer';
import toastReducer from './toast.reducer';
import userReducer from './user.reducer';
import voucherReducer from './voucher.reducer';

const allReducers = combineReducers({
    mapReducer: mapReducer,
    voucherReducer: voucherReducer,
    shopReducer: shopReducer,
    toastReducer: toastReducer,
    userReducer: userReducer,
    itemReducer: itemReducer
})

export default allReducers;